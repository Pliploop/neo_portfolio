export function HeroSection() {
  return (
    <div className="flex flex-col  lg:mt-0 mt-10">
      <div className="w-full flex lg:flex-row justify-between">
        <div className="grow flex flex-col justify-between gap-5 lg:px-12 lg:text-base text-sm">
          <div className="w-full">
            <p className=" text-black text-justify mb-3">
              {" "}
              I'm currently a PhD student at Queen Mary University of London in
              collaboration with Universal Music Group. <span className="font-bold">My PhD project focuses
              on refining self-supervised learning techniques for musical audio,
              to create interpretable, navigable and explainable learned
              representations.</span> 
            </p>

            <p className=" text-black text-justify mb-10">
              {" "}
              The research questions I'm interested in answering are:
            </p>
            <ul className="font-bold mb-6 dark:text-violet-200 text-violet-600 list-decimal list-inside">
              <li>
                How can we leverage domain knowledge to create so far
                underexplored music-specific tasks to disentangle learned
                representations?
              </li>
              <li>
                How can weak supervision from outside modalities further
                disentangle latent spaces and provide intuitive navigation means
                for users?
              </li>
              <li>
                Can human feedback improve the intuitive navigation of latent
                music representations?
              </li>
            </ul>

            <p>
              Through these questions I aim to create navigable, interpretable
              and multimodal latent spaces to help musicians create musicians
              and to further our understanding of music as a whole.
            </p>
            <br />
            <br />
          </div>
        </div>
      </div>
      <div className="grow w-full flex flex-col lg:flex-row justify-between mb-20">
        <ResearchSection />
      </div>
    </div>
  );
}


const ResearchSection = () => {
  return (
    <div className="h-auto lg:mb-0 mb-10 lg:w-2/3 grow lg:px-10">
      <div className="flex flex-row align-middle mb-6">
        <h2 className="font-inter text-lg font-semibold text-violet-500">
          {" "}
          Other research interests
        </h2>
        <div className="mx-3 h-px grow bg-black self-center"></div>
      </div>
      <div className="text-sm text-gray-800 font-inter text-justify">
        <p className="lg:mb-6 mb-10">
          {" "}
          My research interests lie at the intersection of music and Artificial
          Intelligence / Machine Learning. <span className="font-bold"> Self-Supervised learning for Musical
          Audio, Representation Learning. Multimodal learning. Human-in-the-loop
          for music. Music retrieval, Foley retrieval. Text-to-Music generation
          and understanding. Music Automatic Captioning. Music Information
          Retrieval. Audio effects with machine learning. Disentangled latent
          spaces for music </span>. I believe that advances in music technology powered
          by artficial intelligence can be powerful catalysts for creative
          musical outlets. As a vocalist, multiinstrumentalist, producer, mixing
          and mastering aficionado, my interests span a large range of current
          domains in sound and music computing.
        </p>
        {/* <ul className="flex lg:flex-row flex-col lg:gap-0 gap-10 justify-evenly mb-5 lg:px-0 px-10">
          <li className="text-base text-violet-500 font-inter text-center">
            {" "}
            Music Information Retrieval
            <div className="w-full h-px bg-violet-500 my-3"></div>
            <ul className="font-inter font-base text-sm text-gray-800 flex flex-col gap-2">
              <li> Music generation</li>
              <li> Automatic Music Transcription</li>
              <li> F0 estimation</li>
              <li> Source Separation</li>
              <li> Neural Audio Effects</li>
            </ul>
          </li>
          <li className="text-base text-blue-500 font-inter text-center">
            Methods
            <div className="w-full h-px bg-violet-500 my-3"></div>
            <ul className="font-inter font-base text-sm text-gray-800  flex flex-col gap-2">
              <li>Representation learning</li>
              <li>Self-supervised learning</li>
              <li>Multimodal representations</li>
              <li>Few-shot learning</li>
            </ul>
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default <HeroSection />;
