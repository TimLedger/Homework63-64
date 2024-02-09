export interface ApiPost {
    title: string;
    comment: string;
    time: string; 
}

export interface Post extends ApiPost{
    id: string;
}

export interface ApiPosts {
    [id: string]:  ApiPost;
}

export interface ApiPage{
    title: string;
    text: string; 
}

export interface ApiPageContacts extends ApiPage{
    address: string; 
    phone: string; 
    email: string; 
}

