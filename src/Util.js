/**
 * @return a random string of alpha numeric characters
 *
 * @param length      The length of the string to generate
 * @param mixedCase   If true, then upper and lowercase characters will used
 *                    If false, then only uppercase characters will be used
 * @return string
 */
export function randomAlphaNumericString(length = 10, mixedCase = true)
{
  let dgtarr = "0123456789";                    // digits array
  let uprarr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";    // uppercase characters array
  let lwrarr = "abcdefghijklmnopqrstuvwxyz";    // lowercase characters array
  let smparr;                                   // sample characters array (used to build random string)
  let rndstr = "";                              // random string

  // build sample characters array
  smparr = dgtarr + uprarr;
  if(mixedCase) { smparr += lwrarr; }

  // build a random string using the characters in the sample array
  let smparrmaxidx = smparr.length - 1;
  for(let xa=0; xa<length; xa++) {
    rndstr += smparr.charAt(randomInt(0,smparrmaxidx));
  }

  // return the new random string
  return rndstr;
}

/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 */
function randomInt(min, max) {
  if(max<min) { return min; }
  if(min>max) { return max; }
  return Math.floor(min + (Math.random() * (max - min + 1)));
}
