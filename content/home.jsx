import Image from "next/image";
import { Button } from "@/components/ui/button"
import { RightAngleIcon } from "@/components/icons/rightAngle";
import Bacteria from "@/assets/images/bacteria@2x.png";

export const HomeData = () => {
  return (
    <>
      <div className="home-content relative z-10">
        <h1 className="sr-only">
          EXPECTATIONS ELEVATED
        </h1>

        <article>
          <p className="font-bold text-lg leading-tight text-balance">In a 12-month study, QIVIGY achieved quality patient outcomes<sup>1,2</sup>: </p>
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
                <strong>DAYS OF HOSPITALIZATION</strong>{" "}<br className="item__break" />
                due to infection per <span className="whitespace-nowrap">person-year</span><sup className="-top-0.5">1</sup>
              </span>
            </p>
          </article>
          <article className="item">
            <p>
              <span className="item__number">3<span>%</span></span>{" "}
              <span className="item__focus">
                <strong>OF THE YEAR ON ANTIBIOTICS<sup className="font-normal! text-sm!">1</sup>*</strong>
              </span>
            </p>
          </article>
          <article className="item">
            <p>
              <span className="item__number">93<span>%</span></span>{" "}
              <span className="item__focus">
                <strong>OF PATIENTS WERE SATISFIED WITH QIVIGY<sup className="font-normal! text-sm! -top-1">2†</sup></strong>
              </span>
            </p>
          </article>
        </section>

        <h2 className="mt-0 mb-4">EXPECT MORE WITH QIVIGY.</h2>
        <Button href="/starting-qivigy" variant="home" className="mx-2! md:mx-0 max-w-[655px] w-full">
          <span className="text-2xl font-bold leading-none whitespace-nowrap">Start QIVIGY</span>
          <span className="text-base md:text-lg font-bold leading-none border-l-2 border-white pl-4 ml-2">See dosing and ordering information</span>
          <RightAngleIcon className="w-4 h-4" />
        </Button>

        <div className="reference-text text-left mx-auto mt-8 space-y-2 px-4 md:px-0 max-w-[655px]">
          <p><span className="float-left -ml-1.5!">*</span>The median (min, max) duration of antibiotic treatment of any kind of infection was 10 days (1, 334). A total of 36 (76.6%) patients used at least 1 course of concomitant antibiotic therapy for treatment of infections. Eleven patients (23.4%) did not require antibiotic treatment.<sup>2</sup></p>

          <p><span className="float-left -ml-1.5!">†</span>A study-specific patient satisfaction questionnaire was an exploratory endpoint in the trial and collected from all 47 treated patients at Week 24. Questionnaire results also showed 68% of patients were satisfied with their previous IVIG therapy.<sup>2</sup></p>

          <p><strong>References: 1.</strong> QIVIGY [prescribing information]. Kedrion Biopharma Inc.; 2025. <strong>2.</strong> Data on file. REF-01262. Kedrion Biopharma Inc.; 2024.</p>
        </div>
      </div>
    </>
  )
}