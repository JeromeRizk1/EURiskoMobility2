class Article{
    constructor(id, 
                abstract, 
                web_url, 
                snippet, 
                lead_paragraph, 
                source, 
                multimedia, 
                headline, 
                keywords, 
                pub_date, 
                document_type, 
                news_desk, 
                section_name, 
                byline, 
                type_of_material, 
                word_count, 
                uri){
                    
        this.id = id;
        this.abstract = abstract;
        this.web_url = web_url;
        this.snippet = snippet;
        this.lead_paragraph = lead_paragraph;
        this.source = source;
        this.multimedia = multimedia;
        this.headline = headline;
        this.keywords = keywords;
        this.pub_date = pub_date;
        this.document_type = document_type;
        this.news_desk = news_desk;
        this.section_name = section_name;
        this.byline = byline;
        this.type_of_material = type_of_material;
        this.word_count = word_count;
        this.uri = uri;

    }
}

export default Article;