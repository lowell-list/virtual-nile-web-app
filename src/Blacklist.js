/**************************************************************************
 * CONSTANTS
 **************************************************************************/

/**
 * Case insensitive blacklist words.  Words must be all lowercase for proper comparison.
 */
const BLACKLIST_CASE_INSENSITIVE = [

  // obscene / curse / inappropriate words
  'ass',
  'bitch',
  'boob',
  'butt',
  'buttface',
  'cocks',
  'cunt',
  'damn',
  'dead',
  'death',
  'deaznut',
  'deeznut',
  'devil',
  'dick',
  'fuck',
  'gay',
  'ho',
  'kill',
  'killa',
  'killer',
  'mcpoo',
  'nigga',
  'nigger',
  'penis',
  'poo',
  'poop',
  'poopsy',
  'poopy',
  'queef',
  'rape',
  'satan',
  'sex',
  'shit',
  'tits',
  'urmom',
  'vagina'
];

/**************************************************************************
 * MAIN CLASS
 **************************************************************************/

class Blacklist {

  /**
   * Returns true if a blacklisted word is found anywhere in the string,
   * even if the blacklisted word is part of another word.
   * If no blacklisted words are found, returns false.
   *
   * @param string    The string to check.  May be a single word or a phrase.
   */
  static stringContainsBlacklistWord(string)
  {
    let blklstwrd; // blacklist word

    // check if case-insensitive blacklist word is present
    let lwrcsestr = string.toLowerCase();
    for(blklstwrd of BLACKLIST_CASE_INSENSITIVE) {
      if(lwrcsestr.indexOf(blklstwrd)>=0) { return true; }
    }

    return false;
  }

  static isNameClean(value) {
    return !this.stringContainsBlacklistWord(value,false);
  }

}

/**************************************************************************
 * EXPORTS
 **************************************************************************/

export default Blacklist;
