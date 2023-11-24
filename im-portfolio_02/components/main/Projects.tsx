import styles from "@/style/components/main/projects.module.scss";
import { useState } from "react";
import Button from "../common/Button";
import { SectionLayout } from "../common/layout";
import Modal from "../common/Modal";
import Input from "../common/Input";
import { addFirestore, uploadImage } from "@/firebase";
import { BorderBox } from "../common/BorderBox";
import Image from "next/image";
import Link from "next/link";
import { ProjectsData } from "@/types";

interface AddProjectsValueType {
  name: string;
  description: string;
  domain: string;
  github: string;
  image?: File;
}
interface ProjectProps {
  myProjectsData: ProjectsData[];
}

export default function Projects({ myProjectsData }: ProjectProps) {
  const initialAddProjectValue = {
    name: "",
    description: "",
    domain: "",
    github: "",
    image: undefined,
  };
  const [projectValue, setProjectValue] = useState<AddProjectsValueType>(
    initialAddProjectValue
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [focusProjectIndex, setFocusProjectIndex] = useState<number>(0);
  const currentFocusProject = myProjectsData?.[focusProjectIndex];

  const modalToggle = () => {
    setModalVisible(!modalVisible);
    setProjectValue(initialAddProjectValue);
  };

  const addProject = async () => {
    if (projectValue.name !== "" && projectValue.description !== "") {
      try {
        const date = new Date();
        date.getTime();
        if (projectValue.image) {
          const downloadUrl = await uploadImage(projectValue.image);

          addFirestore("projects", {
            name: projectValue.name,
            description: projectValue.description,
            domain: projectValue.domain,
            github: projectValue.github,
            image: downloadUrl,
            date: date.getTime(),
          });
        } else {
          // 이미지가 없을 경우의 로직
          addFirestore("projects", {
            name: projectValue.name,
            description: projectValue.description,
            domain: projectValue.domain,
            github: projectValue.github,
            image: null,
            date: date.getTime(),
          });
        }
      } catch (e) {
        alert(e);
      }
    } else {
      return alert("추가하실 프로젝트의 이름과 설명을 작성해주세요");
    }
  };

  return (
    <>
      {modalVisible && (
        <Modal
          label="프로젝트 추가하기"
          closeModal={modalToggle}
          // saveModal={addProject}
          saveModal={() => {
            alert("권한이 없습니다.");
          }}
        >
          <Input
            autoFocus
            value={projectValue.name}
            placeholder={"프로젝트의 이름을 작성해주세요."}
            onChange={(value) => {
              setProjectValue({ ...projectValue, name: value.toUpperCase() });
            }}
          />
          <Input
            value={projectValue.description}
            placeholder={"프로젝트를 간략히 소개해주세요."}
            onChange={(value) => {
              setProjectValue({ ...projectValue, description: value });
            }}
          />
          <Input
            value={projectValue.domain}
            placeholder={"프로젝트의 도메인을 입력해주세요."}
            onChange={(value) => {
              setProjectValue({ ...projectValue, domain: value });
            }}
          />
          <Input
            value={projectValue.github}
            placeholder={"깃허브 주소를 입력해주세요."}
            onChange={(value) => {
              setProjectValue({ ...projectValue, github: value });
            }}
          />
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setProjectValue({ ...projectValue, image: e.target.files[0] });
              }
            }}
          />
        </Modal>
      )}
      <section className={styles.Projects}>
        <Button onClick={modalToggle}>
          <span>+</span>
        </Button>
        <SectionLayout label="projects">
          <div className={styles.projectsContentWrapper}>
            <div className={styles.projectsList}>
              {myProjectsData.map((project, index) => {
                return (
                  <BorderBox
                    boxStyle="square"
                    key={`myProject_${project.name}`}
                    active={focusProjectIndex === index && true}
                    onClick={() => {
                      setFocusProjectIndex(index);
                    }}
                  >
                    <strong>{project.name}</strong>
                  </BorderBox>
                );
              })}
            </div>
            <div className={styles.projectDescription}>
              <div className={styles.imageWrap}>
                {/* <Image
                  src={currentFocusProject?.image}
                  layout="fill"
                  alt="/"
                  quality={60}
                /> */}
                <img src={currentFocusProject?.image} />
              </div>
              <BorderBox boxStyle="square">
                <div>{currentFocusProject?.description}</div>
                <div className={styles.linkWrap}>
                  <Link
                    href={currentFocusProject?.github ?? "/"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 30 30"
                      width="48px"
                      height="48px"
                      fill="#FFF"
                    >
                      <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" />
                    </svg>
                    <span>
                      {currentFocusProject?.domain === ""
                        ? "Unregistered"
                        : "Github"}
                    </span>
                  </Link>
                  <Link
                    href={currentFocusProject?.domain ?? "/"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 30 31"
                      width="48px"
                      height="48px"
                      fill="#000"
                    >
                      <g>
                        <path
                          d="M21.25 15.9136C21.25 19.3654 18.4518 22.1636 15 22.1636C11.5482 22.1636 8.75 19.3654 8.75 15.9136C8.75 12.4618 11.5482 9.66357 15 9.66357C18.4518 9.66357 21.25 12.4618 21.25 15.9136Z"
                          stroke="#FFF"
                          stroke-width="1.5"
                        ></path>
                        <path
                          d="M12.5 9.91357C12.5 9.91357 17 15.4136 18 21.4136"
                          stroke="#FFF"
                          stroke-width="1.5"
                        ></path>
                        <path
                          d="M19.5 11.9136C19.5 11.9136 14.5 15.9136 8.5 16.9136"
                          stroke="#FFF"
                          stroke-width="1.5"
                        ></path>
                        <path
                          d="M12 21.4137C12 21.4137 15.5 16.4137 21.5 17.4137"
                          stroke="#FFF"
                          stroke-width="1.5"
                        ></path>
                      </g>
                    </svg>
                    <span>
                      {currentFocusProject?.domain === ""
                        ? "Unregistered"
                        : "Domain"}
                    </span>
                  </Link>
                </div>
              </BorderBox>
            </div>
          </div>
        </SectionLayout>
      </section>
    </>
  );
}
