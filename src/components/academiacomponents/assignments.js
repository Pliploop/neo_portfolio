import {
  Timelinedot2,
  FillerBar,
  Academiatag,
  Pdfbutton,
  GithubButton,
} from "./UnitComponents";

function AssignmentSection() {
  return (
    <div className="lg:w-full md:w-[calc(100%-10rem)] w-[calc(100%-3rem)] h-auto flex dark:text-violet-200 flex-row justify-evenly lg:gap-16 gap-8 -mt-2 mb-10">
      <div
        className="absolute show -mt-40 h-10 w-10 invisible"
        id="assignments"
      />
      <div className="lg:w-1/2 w-full h-full flex flex-col justify-start content-end items-end">
        <div className="flex flex-col content-start items-end gap-3 w-full h-full">
          <div className="flex flex-row justify-between items-center gap-3 w-full mb-3">
            <div className="h-px grow bg-gray-500"></div>
            <div className="font-inter text-base text-gray-800">Context</div>
            <div className="h-px grow bg-gray-500"></div>
          </div>

          <div className="font-inter text-base text-justify flex flex-col gap-3 text-gray-800 w-full mb-5">
            <p>
              Over the course of my graduate studies at Ecole Centrale de Lyon,
              I completed multiple assignments. Though not research related they
              give a standard for my writing as well as academic work. Here you
              can find the assignment and the grade received.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-0">
        <Timelinedot2 />
        <FillerBar />
      </div>
      <div className="w-1/2 flex flex-col justify-start content-end items-start mb-20">
        <div className="text-lg font-inter font-bold text-gray-800 text-right mb-3">
          {" "}
          Graduate assignments
        </div>
        <div className="w-full flex flex-row justify-between font-mono text-base gap-3 border-b-[1px] border-b-gray-300 mb-3">
          <div className="w-2/3 ">Assignment</div>
          <div className="w-1/5">Grade</div>
        </div>

        <Assignment
          name={"Frequency Analysis of Musical sounds"}
          grade={"91% (A)"}
          tags={["Musical Acoustics", "Signal processing"]}
          github={"https://github.com/Pliploop/Projet-AcouMus"}
          href={"./freq.pdf"}
        />
        <Assignment
          name={"RNN for stock price prediction"}
          grade={"103% (A+)"}
          tags={["Machine Learning", "Python"]}
          github={"https://github.com/Pliploop/Stock_Prediction_RNN"}
          href={"./RNN.pdf"}
        />
        <Assignment
          name={"A study on tonal noise control"}
          grade={"85% (B+)"}
          tags={["Acoustics", "Signal processing"]}
          href={"./tonal.pdf"}
        />
        <Assignment
          name={"CNN for multiclass image classification"}
          grade={"120% (A+)"}
          tags={["Machine Learning", "Python"]}
          github={"https://github.com/Pliploop/ConvNN_From_Scratch"}
          href={"./cnn.pdf"}
        />
      </div>
    </div>
  );
}

const Assignment = ({ name, grade, href, tags, github }) => {
  return (
    <div className="flex flex-col w-full gap-2 border-b-[1px] border-b-gray-300 py-5">
      <div className="w-full flex flex-row items-center justify-between gap-3">
        <div className="w-2/3 flex items-center font-inter font-bold text-sm">
          {name}
        </div>
        <div className="w-1/5 flex items-center font-mono font-bold text-violet-600">
          {grade}
        </div>
      </div>
      <div className="flex flex-row gap-3 flex-wrap">
        <div className="flex flex-row gap-3 text-xs text-violet-700 flex-wrap">
          {tags.map(function (name, index) {
            return <Academiatag text={name} />;
          })}
        </div>
        {github ? <GithubButton href={github} /> : <></>}
        <Pdfbutton href={href} />
      </div>
    </div>
  );
};

function AssignmentSectionSmall() {
  return (
    <div className="w-full h-auto flex flex-row justify-start gap-8 -mt-2 mb-10">
      <div className="flex flex-col items-center gap-0">
        <Timelinedot2 />
        <FillerBar />
      </div>
      <div className="flex flex-col h-auto grow">
        <div className="lg:w-1/2 w-full h-full flex flex-col">
          <div className="flex flex-col gap-3 w-full h-full">
            <div className="text-lg font-inter font-bold text-gray-800 text-left mb-3">
              {" "}
              Graduate Assignments
            </div>

            <div className="flex flex-row justify-between items-center gap-3 w-full mb-3">
              <div className="h-px grow bg-gray-500"></div>
              <div className="font-inter text-base text-gray-800">Context</div>
              <div className="h-px grow bg-gray-500"></div>
            </div>

            <div className="font-inter text-sm text-justify flex flex-col gap-3 text-gray-800 mb-5">
              <p>
                Over the course of my graduate studies at Ecole Centrale de
                Lyon, I completed multiple assignments. Though not research
                related they give a standard for my writing as well as academic
                work. Here you can find the assignment and the grade received.
              </p>
            </div>

            <div className="w-full flex flex-row justify-between font-mono text-base gap-3 border-b-[1px] border-b-gray-300 mb-3">
              <div className="w-2/3 ">Assignment</div>
              <div className="w-1/5">Grade</div>
            </div>

            <Assignment
              name={"Frequency Analysis of Musical sounds"}
              grade={"91% (A)"}
              tags={["Musical Acoustics", "Signal processing"]}
              github={"https://github.com/Pliploop/Projet-AcouMus"}
              href={"./freq.pdf"}
            />
            <Assignment
              name={"RNN for stock price prediction"}
              grade={"103% (A+)"}
              tags={["Machine Learning", "Python"]}
              github={"https://github.com/Pliploop/Stock_Prediction_RNN"}
              href={"./RNN.pdf"}
            />
            <Assignment
              name={"A study on tonal noise control"}
              grade={"85% (B+)"}
              tags={["Acoustics", "Signal processing"]}
              href={"./tonal.pdf"}
            />
            <Assignment
              name={"CNN for multiclass image classification"}
              grade={"120% (A+)"}
              tags={["Machine Learning", "Python"]}
              github={"https://github.com/Pliploop/ConvNN_From_Scratch"}
              href={"./cnn.pdf"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { AssignmentSection, AssignmentSectionSmall };
