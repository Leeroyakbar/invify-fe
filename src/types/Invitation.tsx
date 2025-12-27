export interface Invitation {
    slug : string;
    groomName : string;
    brideName : string;

    eventDate : string;
    akadLocation : string;
    receptionLocation : string;

    media : Media[];
}


export interface Media {
    type : "IMAGE" | "VIDEO";
    url : string;
}
