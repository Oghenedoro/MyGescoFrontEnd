import { Domaine } from './domaine.model';
import { Role } from './role.model';

export class Poste {
    id: number;
    nom: string;
    domainId: number;
    roleId: number;
    operateurId: number;
}
