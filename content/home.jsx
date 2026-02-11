import Image from "next/image";
import { Button } from "@/components/ui/button"
import { RightAngleIcon } from "@/components/icons/rightAngle";
import Bacteria from "@/assets/images/bacteria@2x.png";

export const HomeData = () => {
  return (
    <>
      <div className="home-content relative z-10">
        <h1 className="sr-only">
          <span>NOW AVAILABLE</span>
          EXPECTATIONS ELEVATED
        </h1>

        <article>
          <p className="font-bold text-lg leading-tight">In a 12-month study, QIVIGY<sup>®</sup> achieved quality patient outcomes<sup>1,2</sup>: </p>
          <div className="home-content__callout">
            <div className="home-content__callout__number">0</div>
            <p>
              <strong>ACUTE SERIOUS BACTERIAL INFECTIONS</strong><br />
              per <span className="whitespace-nowrap">person-year</span><br />
              (99% confidence limit: 0.10; n=47)<sup>1,2</sup>
            </p>
            <Image src={Bacteria} alt="Bacteria" width={76} height={76} />
          </div>
        </article>

        <section className="home-content__triptych">
          <article className="item">
            <p>
              <span className="item__number">0</span>{" "}
              <span className="item__focus">
                <strong>DAYS OF HOSPITALIZATION</strong>{" "}
                due to infection per <span className="whitespace-nowrap">person-year</span><sup>1</sup>
              </span>
            </p>
          </article>
          <article className="item">
            <p>
              <span className="item__number">3<span>%</span></span>{" "}
              <span className="item__focus">
                <strong>of the year on antibiotics<sup className="font-normal! text-sm!">1*</sup></strong>
              </span>
            </p>
          </article>
          <article className="item">
            <p>
              <span className="item__number">93<span>%</span></span>{" "}
              <span className="item__focus">
                <strong>OF PATIENTS WERE SATISFIED WITH QIVIGY<sup className="font-normal! text-sm!">2†</sup></strong>
              </span>
            </p>
          </article>
        </section>

        <h2 className="mt-0 mb-4">EXPECT MORE WITH QIVIGY.</h2>
        <Button href="/starting-qivigy" variant="home" className="mx-2! md:mx-0">
          <span className="text-2xl font-bold leading-none">Start QIVIGY</span>
          <span className="text-base md:text-lg font-bold leading-none border-l-2 border-white pl-4 ml-2">See dosing and ordering information</span>
          <RightAngleIcon className="w-4 h-4" />
        </Button>
      </div>
    </>
  )
}