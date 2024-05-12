export interface Article {
  _id?:string
    title: string;
    idAuthor:string|number
    description: string;
  content:  string ;
  image:string|File;
tags:string[],
date?:string

  }
  export interface Articles{
    article:Article[]
  }