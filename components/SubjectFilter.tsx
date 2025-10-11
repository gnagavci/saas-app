"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
const capitalizeFirstLetter = (word: string): string => {
  let letters: string[] = word.split("");
  letters[0] = letters[0].toUpperCase();
  let result = letters.join("");

  return result;
};

const SubjectFilter = () => {
  // Testing the state changes
  // setTimeout(()=>{console.log(selectedSubject);}, 5000);

  
  const router = useRouter();

  const searchParams = useSearchParams();

  const query = searchParams.get("subject") || "";

  const [selectedSubject, setSelectedSubject] = useState(query);

  useEffect(() => {
    let newUrl = "";
    if (selectedSubject === "all") {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["subject"],
      });

    } else {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "subject",
          value: selectedSubject,
        });
      }
      router.push(newUrl, { scroll: false });
    },[selectedSubject]);

  return (
    <div>
      <Select onValueChange={setSelectedSubject} value={selectedSubject}>
        <SelectTrigger className="input capitalize">
          <SelectValue placeholder="Select subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All subjects</SelectItem>
          {subjects.map((subject) => (
            <SelectItem key={subject} value={subject}>
              {capitalizeFirstLetter(subject)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SubjectFilter;
