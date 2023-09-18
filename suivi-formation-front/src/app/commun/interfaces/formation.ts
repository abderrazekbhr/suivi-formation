export  interface Formation{
    categorie: string;
    idFormation?:number,
    nomFormation:string,
    nombrePlace:number,
    description:string,
    dateDebut?:Date,
    duree:number,
    emailManager?:string,
    entiteFormatrice:string;
    time:string;
    confirmed :boolean;
    numberInscrit:number;
}
