import qmul from '../assets/logos/qmul.png';
import umg from '../assets/logos/umg.png';
import sonycsl from '../assets/logos/sonycsl.png';
import believe from '../assets/logos/believe.png';
import groover from '../assets/logos/groover.png';
import artefact from '../assets/logos/artefact.png';
import ircam from '../assets/logos/ircam.png';
import adelaide from '../assets/logos/adelaide.png';
import ecl from '../assets/logos/ecl.png';
import spotify from '../assets/logos/spotify.png';
import splice from '../assets/logos/splice.png';

// Greyscale 3:2 marks, pre-normalised (dark = ink) so they dither consistently.
const LOGOS = { qmul, umg, sonycsl, believe, groover, artefact, ircam, adelaide, ecl, spotify, splice };

export function logoFor(key) {
  return LOGOS[key] ?? null;
}
