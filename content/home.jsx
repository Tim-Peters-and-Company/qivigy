import { Button } from "@/components/ui/button"
import { RightAngleIcon } from "@/components/icons/rightAngle";

export const HomeData = () => {
  return (
    <div className="home-content relative z-10">
      <h1 className="sr-only">
        <span>NOW AVAILABLE</span>
        EXPECTATIONS ELEVATED
      </h1>

      <article >
        <p className="font-bold text-lg">In a 12-month study, QIVIGY® achieved quality patient outcomes<sup>1,2*</sup>: </p>
        <div className="home-content__callout">
          <div className="home-content__callout__number">0</div>
          <p>
            <strong>ACUTE SERIOUS BACTERIAL INFECTIONS</strong><br />
            per person-year<br />
            (99% confidence limit: 0.10; N=47)<sup>1,2</sup></p>
        </div>
      </article>

      <section className="home-content__triptych">
        <article className="home-content__triptych__item">
          <p>
            <span className="home-content__triptych__item__number">0</span>
            <span className="home-content__triptych__item__focus">DAYS OF HOSPITALIZATION</span>
            <span>due to infection per person-year<sup>1</sup></span>
          </p>
        </article>
        <article className="home-content__triptych__item">
          <p>
            <span className="home-content__triptych__item__number">97<span>%</span></span>
            <span>of the year</span>
            <span className="home-content__triptych__item__focus">ANTIBIOTIC-FREE<sup>1</sup></span>
          </p>
        </article>
        <article className="home-content__triptych__item">
          <p>
            <span className="home-content__triptych__item__number">93<span>%</span></span>
            <span className="home-content__triptych__item__focus">OF PATIENTS WERE SATISFIED WITH QIVIGY<sup>2, †</sup></span>
            <span>due to infection per person-year<sup>1</sup></span>
          </p>
        </article>

      </section>

      <h2 className="mb-4">EXPECT MORE WITH QIVIGY.</h2>
      <Button href="/starting-qivigy" variant="home">
        <span className="text-2xl font-bold">Start QIVIGY</span>
        <span className="text-lg font-bold border-l-2 border-white pl-4 ml-2">See dosing and ordering information</span>
        <RightAngleIcon className="w-4 h-4" />
      </Button>
    </div>
  )
}