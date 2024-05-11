export interface Article {
    title: string;
    idAuthor:string|number
    description: string;
  content:  string ;
  image?:string|File;
tags:string[]

  }