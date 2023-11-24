import { BorderBox } from "../common/BorderBox";
import styles from "@/style/components/main/skills.module.scss";
import { SectionLayout } from "../common/layout";
import { addFirestore, uploadImage } from "@/firebase";
import { useState } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import Image from "next/image";
import { SkillsData } from "@/types";

interface AddSkillValueType {
  name: string;
  experience: string;
  image?: File;
}
interface SkillsProps {
  mySkillsData: SkillsData[];
}

export default function Skills({ mySkillsData }: SkillsProps) {
  const initialAddSkillValue = {
    name: "",
    experience: "",
    image: undefined,
  };
  const [skillValue, setSkillValue] =
    useState<AddSkillValueType>(initialAddSkillValue);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [focusSkillIndex, setFocusSkillIndex] = useState<number>(0);
  const currentFocusSkill = mySkillsData?.[focusSkillIndex];
  const modalToggle = () => {
    setModalVisible(!modalVisible);
    setSkillValue(initialAddSkillValue);
  };

  const addSkill = async () => {
    if (skillValue.name !== "" && skillValue.experience !== "") {
      try {
        const date = new Date();
        date.getTime();
        if (skillValue.image) {
          const downloadUrl = await uploadImage(skillValue.image);

          addFirestore("skills", {
            name: skillValue.name,
            experience: skillValue.experience,
            image: downloadUrl,
            date: date.getTime(),
          });
        } else {
          // 이미지가 없을 경우의 로직
          addFirestore("skills", {
            name: skillValue.name,
            experience: skillValue.experience,
            image: null, // 또는 다른 기본값
            date: date.getTime(),
          });
        }
      } catch (e) {
        alert(e);
      }
    } else {
      return alert("추가하실 스킬의 이름과 설명을 작성해주세요");
    }
  };

  return (
    <>
      {modalVisible && (
        <Modal
          label="스킬 추가하기"
          closeModal={modalToggle}
          // saveModal={addSkill}
          saveModal={() => {
            alert("권한이 없습니다.");
          }}
        >
          <Input
            autoFocus
            value={skillValue.name}
            placeholder={"기술의 이름을 작성해주세요."}
            onChange={(value) => {
              setSkillValue({ ...skillValue, name: value.toUpperCase() });
            }}
          />
          <Input
            value={skillValue.experience}
            placeholder={"기술의 활용도를 작성해주세요."}
            onChange={(value) => {
              setSkillValue({ ...skillValue, experience: value });
            }}
          />
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setSkillValue({ ...skillValue, image: e.target.files[0] });
              }
            }}
          />
        </Modal>
      )}
      <section className={styles.skills}>
        <Button onClick={modalToggle}>
          <span>+</span>
        </Button>
        <SectionLayout label="skills">
          <div className={styles.skillContentWrapper}>
            <div className={styles.skillList}>
              {mySkillsData?.map((skill, index) => {
                return (
                  <BorderBox
                    propsClassName={`${
                      focusSkillIndex === index && styles.active
                    }`}
                    key={`mySkill_${skill.name}`}
                    boxStyle="circle"
                    active={focusSkillIndex === index && true}
                    onClick={() => {
                      setFocusSkillIndex(index);
                    }}
                  >
                    <strong>{skill.name}</strong>
                  </BorderBox>
                );
              })}
            </div>
            <SectionLayout
              label={currentFocusSkill?.name}
              labelLeft={
                <Image
                  className={styles[currentFocusSkill?.name]}
                  src={currentFocusSkill?.image}
                  alt="//"
                  width={50}
                  height={50}
                />
              }
            >
              <div className={styles.skillDescription}>
                {currentFocusSkill?.experience}
              </div>
            </SectionLayout>
          </div>
        </SectionLayout>
      </section>
    </>
  );
}
