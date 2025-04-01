export async function getVehiclesByDevLicenseAndOwner(devLicense: string, onwer: string): Promise<any[]>{
    const GRAPHQL_URL = "https://identity-api.dimo.zone/query";
    const query = `
        query GetVehicleByDevLicense {
        vehicles(filterBy: { privileged: "${devLicense}", owner: "${onwer}"}, first: 100) {
            nodes {
            owner
            tokenId
            image
            name
            definition {
                make
                model
                year
            }
            }
        }
        }
    `;
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data.vehicles.nodes;
}

export async function getAmountOfConnectedBatteries(devLicense: string): Promise<Number> {
    const GRAPHQL_URL = "https://identity-api.dimo.zone/query";
    const query = `
        query GetVehicleByDevLicense {
        vehicles(filterBy: { privileged: "${devLicense}"}, first: 100) {
            nodes {
            owner
            tokenId
            image
            name
            definition {
                make
                model
                year
            }
            }
        }
        }
    `;
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data.vehicles.nodes.length;
}