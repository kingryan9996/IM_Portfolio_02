"use client";
import Image from "next/image";
import styles from "@/style/app/page.module.scss";
import Intro from "@/components/main/Intro";
import Profile from "@/components/main/Profile";
import Projects from "@/components/main/Projects";
import Skills from "@/components/main/Skills";
import ScrollToTopBtn from "@/components/ScrollToTopBtn";
import { useEffect, useState } from "react";
import NavigationBar from "@/components/NavigationBar";
import AppStyler from "@/components/AppStyler";
import { fetchCollectionData } from "@/firebase";
import { ProjectsData, SkillsData } from "@/types";
export default function Home() {
  const [scrollTop, setScrollTop] = useState<boolean>(true);
  const [mySkillsData, setMySkillsData] = useState<SkillsData[]>([]);
  const [myProjectsData, setMyProjectsData] = useState<ProjectsData[]>([]);

  useEffect(() => {
    scrollCalculator();
    window.addEventListener("scroll", scrollCalculator);

    loadData();
  }, []);

  const scrollCalculator = () => {
    if (scrollY > 10) {
      setScrollTop(false);
    } else {
      setScrollTop(true);
    }
  };

  const loadData = async () => {
    const skillsData = await fetchCollectionData("skills");
    const sortSkillsData = skillsData.sort((a, b) => a.date - b.date);
    setMySkillsData(sortSkillsData);

    const projectsData = await fetchCollectionData("projects");
    const sortProjectsData = projectsData.sort((a, b) => a.date - b.date);
    setMyProjectsData(sortProjectsData);
  };

  return (
    <main>
      <NavigationBar scrollTop={scrollTop} />
      <div>
        <Intro scrollTop={scrollTop} />
        <Profile />
        <Skills mySkillsData={mySkillsData} />
        <Projects myProjectsData={myProjectsData} />
      </div>
      <AppStyler scrollTop={scrollTop} />
      <ScrollToTopBtn scrollTop={scrollTop} />
    </main>
  );
}
