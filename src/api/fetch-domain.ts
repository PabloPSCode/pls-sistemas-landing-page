const DOMAIN_REGEX =
  /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;

export interface DomainAvailabilitySuccess {
  available: boolean;
  domain: string;
  providerStatus: 200 | 404;
}

export interface DomainAvailabilityFailure {
  error: string;
  status: 400 | 502;
}

const normalizeDomain = (rawDomain: string) =>
  rawDomain
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .replace(/\.$/, "");

const isValidDomain = (domain: string) => DOMAIN_REGEX.test(domain);

export async function fetchDomainAvailability(
  rawDomain: string
): Promise<DomainAvailabilitySuccess | DomainAvailabilityFailure> {
  const normalizedDomain = normalizeDomain(rawDomain);

  if (!normalizedDomain) {
    return {
      error: "Parâmetro 'domain' é obrigatório.",
      status: 400,
    };
  }

  if (!isValidDomain(normalizedDomain)) {
    return {
      error: "Domínio inválido. Exemplo esperado: exemplo.com.br",
      status: 400,
    };
  }

  if (!normalizedDomain.endsWith(".br")) {
    return {
      error: "A consulta aceita apenas domínios terminados em .br",
      status: 400,
    };
  }

  try {
    const response = await fetch(
      `https://rdap.registro.br/domain/${encodeURIComponent(normalizedDomain)}`,
      {
        headers: {
          Accept: "application/rdap+json, application/json;q=0.9",
        },
        cache: "no-store",
      }
    );

    if (response.status === 200) {
      return {
        available: false,
        domain: normalizedDomain,
        providerStatus: 200,
      };
    }

    if (response.status === 404) {
      return {
        available: true,
        domain: normalizedDomain,
        providerStatus: 404,
      };
    }

    if (response.status === 400) {
      return {
        error: "Domínio inválido para consulta no Registro.br.",
        status: 400,
      };
    }

    return {
      error: "Não foi possível consultar o Registro.br no momento.",
      status: 502,
    };
  } catch {
    return {
      error: "Falha de conexão ao consultar o Registro.br.",
      status: 502,
    };
  }
}

