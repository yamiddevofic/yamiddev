import { Client } from "@notionhq/client";
/// <reference types="astro/client" />
  
const notion = new Client({ auth: import.meta.env.NOTION_TOKEN });

export async function getNotionData() {
    const response = await notion.databases.query({
      database_id: import.meta.env.NOTION_DATABASE_ID,
    });
  
    console.log(JSON.stringify(response.results[0], null, 2));
    return response.results;
  }
  
