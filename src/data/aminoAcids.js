// The 20 standard amino acids found in proteins.
//
// Each amino acid is an "object": a group of named values inside { }.
// The whole list is an "array": a list of items inside [ ].
//
// - name:      the full name (what the player has to guess)
// - threeLetter / oneLetter: the short codes biologists use
// - group:     what kind of side chain it has
// - cid:       its ID number in PubChem, a free chemistry database.
//              We use it to load a picture of the chemical structure.

export const aminoAcids = [
  { name: 'Glycine', threeLetter: 'Gly', oneLetter: 'G', group: 'Nonpolar', cid: 750 },
  { name: 'Alanine', threeLetter: 'Ala', oneLetter: 'A', group: 'Nonpolar', cid: 5950 },
  { name: 'Valine', threeLetter: 'Val', oneLetter: 'V', group: 'Nonpolar', cid: 6287 },
  { name: 'Leucine', threeLetter: 'Leu', oneLetter: 'L', group: 'Nonpolar', cid: 6106 },
  { name: 'Isoleucine', threeLetter: 'Ile', oneLetter: 'I', group: 'Nonpolar', cid: 6306 },
  { name: 'Proline', threeLetter: 'Pro', oneLetter: 'P', group: 'Nonpolar', cid: 145742 },
  { name: 'Methionine', threeLetter: 'Met', oneLetter: 'M', group: 'Nonpolar', cid: 6137 },
  { name: 'Phenylalanine', threeLetter: 'Phe', oneLetter: 'F', group: 'Aromatic', cid: 6140 },
  { name: 'Tryptophan', threeLetter: 'Trp', oneLetter: 'W', group: 'Aromatic', cid: 6305 },
  { name: 'Tyrosine', threeLetter: 'Tyr', oneLetter: 'Y', group: 'Aromatic', cid: 6057 },
  { name: 'Serine', threeLetter: 'Ser', oneLetter: 'S', group: 'Polar', cid: 5951 },
  { name: 'Threonine', threeLetter: 'Thr', oneLetter: 'T', group: 'Polar', cid: 6288 },
  { name: 'Cysteine', threeLetter: 'Cys', oneLetter: 'C', group: 'Polar', cid: 5862 },
  { name: 'Asparagine', threeLetter: 'Asn', oneLetter: 'N', group: 'Polar', cid: 6267 },
  { name: 'Glutamine', threeLetter: 'Gln', oneLetter: 'Q', group: 'Polar', cid: 5961 },
  { name: 'Aspartic acid', threeLetter: 'Asp', oneLetter: 'D', group: 'Negatively charged', cid: 5960 },
  { name: 'Glutamic acid', threeLetter: 'Glu', oneLetter: 'E', group: 'Negatively charged', cid: 33032 },
  { name: 'Lysine', threeLetter: 'Lys', oneLetter: 'K', group: 'Positively charged', cid: 5962 },
  { name: 'Arginine', threeLetter: 'Arg', oneLetter: 'R', group: 'Positively charged', cid: 6322 },
  { name: 'Histidine', threeLetter: 'His', oneLetter: 'H', group: 'Positively charged', cid: 6274 },
];

// Builds the web address of the structure picture for one amino acid.
// The ` ` quotes (backticks) let us put a value inside text with ${ }.
export function structureImageUrl(aminoAcid) {
  return `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${aminoAcid.cid}/PNG?image_size=large`;
}
