import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import styled from "styled-components";
import { Button } from "./components/ui/button";
import SearchForm from "./SearchForm";

const Main = () => {
  const { dataProfile } = useAuth();
  return (
    <MainSection className="light Main">
      <div className="mainInner">
        <span>
          <h1>Du lịch &amp; ở Đâu hôm nay</h1>
            <Button className='w-fit'> Khám phá ngay</Button>
          
        </span>
      </div>
      <SearchForm/>
    </MainSection>
  );
};

export default Main;

const MainSection = styled.section`
  background: linear-gradient(to bottom, #0a0c2c80 3rem, transparent 10rem),
    url(/images/main.jpg);
  background-position: center, bottom left;
  background-size: cover, cover;
  height: fit-content;
  color: var(--light);
  padding: 15rem var(--sidePadding) 6rem;
  .mainInner {
    display: flex;
    max-width: var(--containerWidth);
    margin: 0 auto;
  }
  .mainInner h1 {
    color: black !important;
  }
  span {
    max-width: var(--maxWidth);
  }
  h1 {
    font-weight: 900;
    font-size: clamp(2rem, 5.5vw, 3.25rem);
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }
  @media (max-width: 576px) {
    background: linear-gradient(to bottom, #0a0c2c80 3rem, transparent),
      url(images/main-sm.jpg);
    background-position: center, bottom left;
    background-size: cover, cover;
    align-items: flex-start;
    padding-top: 7.5rem;
    height: 75vh;
    max-height: 720px;
  }
`;