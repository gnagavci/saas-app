"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";

export const createCompanion = async (formData: CreateCompanion) => {
  //destructure the userId and rename it as 'author'
  const { userId: author } = await auth();

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formData, author })
    .select();

  if (error || !data) {
    throw new Error(error?.message || "Failed to create a companion");
  }

  return data[0];
};

export const getAllCompanions = async ({limit = 10, page = 1, subject, topic}:  GetAllCompanions) => {

    const supabase = createSupabaseClient();

    let query = supabase.from("companions").select();

    if(subject && topic){
        // `%${subject}%` means we're looking for any mention of the subject
        query = query.ilike("subject", `%${subject}%`).or(`topic.ilike.%${topic}%, name.ilike.%${topic}%`);
    } else if(subject){
        query = query.ilike("subject", `%${subject}%`);
    } else if(topic){
        // we're searching for the topic in either the name or the topic
        query = query.or(`topic.ilike.%${topic}%, name.ilike.%${topic}%`)
    }
    /**
     * for page 1, shows from elements  0 until 9
     * for page 2, shows from elements 10 until 19
     */
    query = query.range((page - 1) * limit, page * limit - 1);

    const {data: companions, error} = await query;

    if(error){
        throw new Error(error.message);
    }

    return companions;

};
