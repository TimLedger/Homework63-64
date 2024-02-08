export interface Description {
    title: string;
    comment: string;
    time: string; 
}

export interface ApiPosts {
    [id: string]: {
        description: Description;
    };
}