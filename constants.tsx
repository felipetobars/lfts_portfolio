import { ResumeData, SkillCategory, ProjectMedia, Certification } from './types';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';
import LinkPreview from './components/LinkPreview';

// Common URLs
const URLS = {
  mlEngineer: "https://datascientest.com/en/machine-learning-engineer-all-about-the-job",
  pythonBackend: "https://www.coursera.org/articles/python-developer?utm_medium=sem&utm_source=gg&utm_campaign=b2c_latam_x_multi_ftcof_career-academy_cx_dr_bau_gg_pmax_gc_s1-v2_en_m_hyb_24-04_nonNRL-within-14d&campaignid=21239613742&adgroupid=&device=c&keyword=&matchtype=&network=x&devicemodel=&creativeid=&assetgroupid=6501905150&targetid=&extensionid=&placement=&gad_source=1&gad_campaignid=21320925518&gbraid=0AAAAADdKX6aPACN8r2wtdFAkN2LKhSqco&gclid=CjwKCAiA4KfLBhB0EiwAUY7GATkNmM-L7iRgCjBL8dac0kbxRfmB2d31CXYwU4cmpAbOQV0p6AVVehoCs70QAvD_BwE",
  mechatronics: "https://www.uao.edu.co/programa/ingenieria-mecatronica/",
  aiSpecialist: "https://virtual.uao.edu.co/blog/especializacion-en-inteligencia-artificial-plan-de-estudios",
  robotics: "https://www.mtu.edu/academics/robotics/what/",
  computerVision: "https://www.ibm.com/think/topics/computer-vision",
  deepLearning: "https://cloud.google.com/discover/what-is-deep-learning?hl=en",
  cad: "https://www.ptc.com/en/technologies/cad"
};

// Google Drive Image IDs converted to direct view URLs using lh3.googleusercontent.com for reliable embedding
const DOCS = {
  specActa: "https://lh3.googleusercontent.com/d/1DuseJXJy97ya7c6_ao1FIAg7dYqNnt4y",
  specDiploma: "https://lh3.googleusercontent.com/d/1MYNX7X3eu47vUfY9n3aZKSt5D5sillmH",
  bachActa: "https://lh3.googleusercontent.com/d/1fsZHTbrb-EKk2Fl3rI-MqoTXCEdjsCtF",
  bachDiploma: "https://lh3.googleusercontent.com/d/1n16EFPiQT4BAVR6hGGdySYPxJqZq2i-w",
  cswaCert: "https://lh3.googleusercontent.com/d/15lHx4uq5YkF0CO84SS6Fd1u3ZSAE6zJb",
  cvTrackingCert: "https://lh3.googleusercontent.com/d/1qw_4GqKwj33ZuDefPFMBebAGEquMK00D",
  imgProcCert: "https://lh3.googleusercontent.com/d/1al47zkjNMWmILmeNsTs3W-tpKAWVfAbE",
  covidCert: "https://lh3.googleusercontent.com/d/17SeVzrOLeCVc-HkIorYjAr-9gHXfb2sa"
};

// Helper to format Drive links for IMAGES
const img = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

// Helper to format YouTube links
// Standard youtube.com embed
const yt = (id: string) => ({
  url: `https://www.youtube.com/embed/${id}`,
  thumbnailUrl: `https://img.youtube.com/vi/${id}/mqdefault.jpg` // Medium quality thumbnail is usually safe
});

// --- MEDIA COLLECTIONS ---

const CODALTEC_LEAD_MEDIA: ProjectMedia[] = [
  { type: 'image', url: img('1fBrJlMmR5MRoKd9SBxtkBjVqVY55DTcr'), thumbnailUrl: img('1fBrJlMmR5MRoKd9SBxtkBjVqVY55DTcr') },
  { type: 'image', url: img('1v9wZrsh8RE-8jMirQG4kJSq8TUQ-JtTL'), thumbnailUrl: img('1v9wZrsh8RE-8jMirQG4kJSq8TUQ-JtTL') },
  { type: 'image', url: img('1Q8Bz6GB_wPFqkswmd0amBUCl3lLpcGs-'), thumbnailUrl: img('1Q8Bz6GB_wPFqkswmd0amBUCl3lLpcGs-') },
  { type: 'image', url: img('1IxYwa45VyNx3w5waDLfmcyjsRFOLoIVi'), thumbnailUrl: img('1IxYwa45VyNx3w5waDLfmcyjsRFOLoIVi') },
  { type: 'image', url: img('1KSokrq8e_mVZDitmfVncaaRGNJewj6xZ'), thumbnailUrl: img('1KSokrq8e_mVZDitmfVncaaRGNJewj6xZ') },
  { type: 'image', url: img('1ilEF2lkpv4wvKHw_yS6FM76dikFyJ9Mf'), thumbnailUrl: img('1ilEF2lkpv4wvKHw_yS6FM76dikFyJ9Mf') },
  // Additional Media Batch 1
  { type: 'image', url: img('1SVjfTfjVMoZlyqzET80iNZGnZXm57K6m'), thumbnailUrl: img('1SVjfTfjVMoZlyqzET80iNZGnZXm57K6m') },
  { type: 'image', url: img('1ZYoG15OgyGhqGKUgJb5kWHr1HH8JgUoj'), thumbnailUrl: img('1ZYoG15OgyGhqGKUgJb5kWHr1HH8JgUoj') },
  { type: 'image', url: img('17FP1w-QHhCzRtiTnxtmASzTsfmVjwI0M'), thumbnailUrl: img('17FP1w-QHhCzRtiTnxtmASzTsfmVjwI0M') },
  { type: 'image', url: img('1T1R64I5eq52pR29sqsv4EjKl11J-WtFa'), thumbnailUrl: img('1T1R64I5eq52pR29sqsv4EjKl11J-WtFa') },
  { type: 'image', url: img('1O3IRb56rTo-sRxPAjRHc6qxoga6A_-UT'), thumbnailUrl: img('1O3IRb56rTo-sRxPAjRHc6qxoga6A_-UT') },
  { type: 'image', url: img('1y3ZaU1yGSbUu54vIftRvVyy3pkPWqxwA'), thumbnailUrl: img('1y3ZaU1yGSbUu54vIftRvVyy3pkPWqxwA') },
  { type: 'image', url: img('1QOTnHgcsdrWPmPdsXrBoPE6q85AhMraT'), thumbnailUrl: img('1QOTnHgcsdrWPmPdsXrBoPE6q85AhMraT') },
  { type: 'image', url: img('1c1HT-oz0DZmtMQlp744b4WWb_o6zXxuq'), thumbnailUrl: img('1c1HT-oz0DZmtMQlp744b4WWb_o6zXxuq') },
  { type: 'image', url: img('1DAR4DAoKKnDUevuF2YTz6FMyQRQlTEbB'), thumbnailUrl: img('1DAR4DAoKKnDUevuF2YTz6FMyQRQlTEbB') },
  { type: 'image', url: img('1KMEXjg_X0pk_aqFgdHh4Xossbfrsl4d2'), thumbnailUrl: img('1KMEXjg_X0pk_aqFgdHh4Xossbfrsl4d2') },
  { type: 'image', url: img('1bbdcLsTpKgfk2Q7iS7L6xu1gtW5EyAC5'), thumbnailUrl: img('1bbdcLsTpKgfk2Q7iS7L6xu1gtW5EyAC5') },
  { type: 'image', url: img('1FliWyXYd7ANN5O61SPPJWBqNEhUrgprP'), thumbnailUrl: img('1FliWyXYd7ANN5O61SPPJWBqNEhUrgprP') },
  { type: 'image', url: img('1-ou36t0M_MhZrNGoUH6VstPeWgFnTlPm'), thumbnailUrl: img('1-ou36t0M_MhZrNGoUH6VstPeWgFnTlPm') },
  // Additional Media Batch 2
  { type: 'image', url: img('1HqrPggbAnPnDcWxG6nWTt9E3uGHE41oa'), thumbnailUrl: img('1HqrPggbAnPnDcWxG6nWTt9E3uGHE41oa') },
  { type: 'image', url: img('16zo0kCktF42R_ol5LYahx_f-kJfW-Ss9'), thumbnailUrl: img('16zo0kCktF42R_ol5LYahx_f-kJfW-Ss9') },
  { type: 'image', url: img('1ZoxRUY1iNd77lTJUd12UD8xcD7ulRvy0'), thumbnailUrl: img('1ZoxRUY1iNd77lTJUd12UD8xcD7ulRvy0') },
  { type: 'image', url: img('1nUszWjgOiI6En7F_dYAmQwFzGJWt6wiZ'), thumbnailUrl: img('1nUszWjgOiI6En7F_dYAmQwFzGJWt6wiZ') },
  { type: 'image', url: img('1BKJrTLEJckSOQmuJc_Q5fZYGKq3BdNsk'), thumbnailUrl: img('1BKJrTLEJckSOQmuJc_Q5fZYGKq3BdNsk') },
  { type: 'image', url: img('1Y5H-8zVCtiSnsheJCxwZyworzXE3J392'), thumbnailUrl: img('1Y5H-8zVCtiSnsheJCxwZyworzXE3J392') },
  { type: 'image', url: img('1gq-xAvYYPCVGD-Pr9zXkZkzZKIryPhNS'), thumbnailUrl: img('1gq-xAvYYPCVGD-Pr9zXkZkzZKIryPhNS') },
  { type: 'image', url: img('12d9rhFU7a2nh2UNehRDZ7rKPinHhELHj'), thumbnailUrl: img('12d9rhFU7a2nh2UNehRDZ7rKPinHhELHj') },
  { type: 'image', url: img('17WB7pEYOmsvwX50i1fPyxQisbSZUjjz5'), thumbnailUrl: img('17WB7pEYOmsvwX50i1fPyxQisbSZUjjz5') },
  { type: 'image', url: img('1WoIja1LG0IvfsqJj2oXvdf_AJz8GIam3'), thumbnailUrl: img('1WoIja1LG0IvfsqJj2oXvdf_AJz8GIam3') },
];

const MANGLAR_MEDIA: ProjectMedia[] = [
  // Previous Batch
  { type: 'image', url: img('1rzv4H6_T636SyrmzM_vU84i6OvmG_6Hf'), thumbnailUrl: img('1rzv4H6_T636SyrmzM_vU84i6OvmG_6Hf') },
  { type: 'image', url: img('1QdGdV6zHKOY7-KoJgHnaoPeTO2zFAqaF'), thumbnailUrl: img('1QdGdV6zHKOY7-KoJgHnaoPeTO2zFAqaF') },
  { type: 'image', url: img('1IMSM5wb2kl00HxCv3xREvsAptXL8V27O'), thumbnailUrl: img('1IMSM5wb2kl00HxCv3xREvsAptXL8V27O') },
  { type: 'image', url: img('1lQvxNs0HkM6Xk06IhOTO0LNrn7CEooOi'), thumbnailUrl: img('1lQvxNs0HkM6Xk06IhOTO0LNrn7CEooOi') },
  { type: 'image', url: img('1-4L9yv1u89i6bW_UPlbJptR5rpalpf0a'), thumbnailUrl: img('1-4L9yv1u89i6bW_UPlbJptR5rpalpf0a') },
  { type: 'image', url: img('1LCbkBuTAl4lBPHLeTp_LcRO1O70ZAnak'), thumbnailUrl: img('1LCbkBuTAl4lBPHLeTp_LcRO1O70ZAnak') },
  { type: 'image', url: img('1kAdt1PGEa9ClMZY0fhHgNUac_Uakv9RP'), thumbnailUrl: img('1kAdt1PGEa9ClMZY0fhHgNUac_Uakv9RP') },
  { type: 'image', url: img('1WEgCHlTz2N2G_ryl1rBj0JvdrQ0PvV-e'), thumbnailUrl: img('1WEgCHlTz2N2G_ryl1rBj0JvdrQ0PvV-e') },
  // New Batch
  { type: 'image', url: img('12ThP_B7PBPgYqgiQfA0U7ppnwBTvuzQM'), thumbnailUrl: img('12ThP_B7PBPgYqgiQfA0U7ppnwBTvuzQM') },
  { type: 'image', url: img('1Z1thEOOQKgUGsythcNfXvVeFAOpwma5N'), thumbnailUrl: img('1Z1thEOOQKgUGsythcNfXvVeFAOpwma5N') },
  { type: 'image', url: img('1ZHGBuq0aEgFnSEuiVnciNeEI1S741eGp'), thumbnailUrl: img('1ZHGBuq0aEgFnSEuiVnciNeEI1S741eGp') },
  { type: 'image', url: img('194j4HUSbXWPOTb9rZDBY25de7Dod8rK0'), thumbnailUrl: img('194j4HUSbXWPOTb9rZDBY25de7Dod8rK0') },
  { type: 'image', url: img('1hHSbjfA-46Z98DRJRbsKlL0sstVegSVV'), thumbnailUrl: img('1hHSbjfA-46Z98DRJRbsKlL0sstVegSVV') },
  { type: 'image', url: img('1_7uUPdx9H-Az6oJywU0x1MCsRdw3DTmb'), thumbnailUrl: img('1_7uUPdx9H-Az6oJywU0x1MCsRdw3DTmb') },
  { type: 'image', url: img('1AnF1XYnmvHwCkkKNnGR8_vwjKVUP981L'), thumbnailUrl: img('1AnF1XYnmvHwCkkKNnGR8_vwjKVUP981L') },
  { type: 'image', url: img('1Rr7gJNA1kFh0cf47If-ClT8j8UkEBfsV'), thumbnailUrl: img('1Rr7gJNA1kFh0cf47If-ClT8j8UkEBfsV') },
  { type: 'image', url: img('14SD_uneciL61Q203NXLloqJNqLTceJDI'), thumbnailUrl: img('14SD_uneciL61Q203NXLloqJNqLTceJDI') },
  { type: 'image', url: img('1zg9nJYtMWEoX5QZiFa4NZ12eEuSXFG2w'), thumbnailUrl: img('1zg9nJYtMWEoX5QZiFa4NZ12eEuSXFG2w') },
];

const CITAE_RESEARCHER_MEDIA: ProjectMedia[] = [
  // New Videos
  { type: 'video', ...yt('YkPjbHFrtlo') },
  { type: 'video', ...yt('nertwfzbxKo') },
  { type: 'video', ...yt('CLuY5_vAjG4') },
  // Existing Images
  { type: 'image', url: img('1rbHJnDTzGfP5Ua5AhflG6IBvvu6flZzD'), thumbnailUrl: img('1rbHJnDTzGfP5Ua5AhflG6IBvvu6flZzD') },
  { type: 'image', url: img('1nRfJlC4DJuYi7tkYUqcENB8RRgaUh70a'), thumbnailUrl: img('1nRfJlC4DJuYi7tkYUqcENB8RRgaUh70a') },
  { type: 'image', url: img('1lHOZxMCaGyEwDA-LK8kHU_yRb9jS5JBv'), thumbnailUrl: img('1lHOZxMCaGyEwDA-LK8kHU_yRb9jS5JBv') },
  { type: 'image', url: img('1xb7CyY4T6_A4kSOcg-7CwCaS4pvQWQdv'), thumbnailUrl: img('1xb7CyY4T6_A4kSOcg-7CwCaS4pvQWQdv') },
  { type: 'image', url: img('1RJFU6EXe452SbMQDwS6jplwbuYroANtu'), thumbnailUrl: img('1RJFU6EXe452SbMQDwS6jplwbuYroANtu') },
  { type: 'image', url: img('1AQQzALpmk77O_7HPnsbYgiwrKCJGs8ZY'), thumbnailUrl: img('1AQQzALpmk77O_7HPnsbYgiwrKCJGs8ZY') },
  { type: 'image', url: img('17X-zemg4JxejDSgKYFVyPADxbAZN795v'), thumbnailUrl: img('17X-zemg4JxejDSgKYFVyPADxbAZN795v') },
];

const EASY_TIFFVISOR_MEDIA: ProjectMedia[] = [
  { type: 'video', ...yt('AgcjdWkLui4') },
  { type: 'image', url: img('1bDyGkMUFs6XDeqrs-1fkQ772VIJX_LWW'), thumbnailUrl: img('1bDyGkMUFs6XDeqrs-1fkQ772VIJX_LWW') },
  { type: 'image', url: img('1eryGV_ipP1Ye4KOaOpo0jLgWxv3QuZE7'), thumbnailUrl: img('1eryGV_ipP1Ye4KOaOpo0jLgWxv3QuZE7') },
  { type: 'image', url: img('1fHgZs4P1FeYVMOYUBvGHrm7WM7-MlHgw'), thumbnailUrl: img('1fHgZs4P1FeYVMOYUBvGHrm7WM7-MlHgw') },
  { type: 'image', url: img('1htSw6WfhaMtsHhWR39ciAsm0hQNPD_d2'), thumbnailUrl: img('1htSw6WfhaMtsHhWR39ciAsm0hQNPD_d2') },
];

const EASY_WHISPER_MEDIA: ProjectMedia[] = [
  { type: 'video', ...yt('jPayUEBCCbQ') },
  { type: 'image', url: img('1UoeQ8qJHsuu3fbJ10hWLWPPnDRVp_iK4'), thumbnailUrl: img('1UoeQ8qJHsuu3fbJ10hWLWPPnDRVp_iK4') },
  { type: 'image', url: img('1N2FhWuI_6W6bYf3m7AwKJksGbOOlvJyx'), thumbnailUrl: img('1N2FhWuI_6W6bYf3m7AwKJksGbOOlvJyx') },
  { type: 'image', url: img('1yul7TvgrfEI8RQtkwRqa7roVTuEyAtVO'), thumbnailUrl: img('1yul7TvgrfEI8RQtkwRqa7roVTuEyAtVO') },
];

const KITTI_MEDIA: ProjectMedia[] = [
  // Videos (YouTube IDs provided)
  { type: 'video', ...yt('jxrX_XR2wgc') }, // Specific Test Video
  { type: 'video', ...yt('fr85fLEL1bg') },
  { type: 'video', ...yt('Mhf8L0j8d4o') },
  { type: 'video', ...yt('HDQ_KA_KdMk') },

  // Images
  { type: 'image', url: img('1SkT9R6z_hipLdkWxX6R5-KXXrGnVSz52'), thumbnailUrl: img('1SkT9R6z_hipLdkWxX6R5-KXXrGnVSz52') },
  { type: 'image', url: img('1BazJ2wLrHkM02y9cd2y1gFF9wknVOD7x'), thumbnailUrl: img('1BazJ2wLrHkM02y9cd2y1gFF9wknVOD7x') },
  { type: 'image', url: img('136g_pJb4Q9jZ_TNqIbCqPYQr2KMi6fN2'), thumbnailUrl: img('136g_pJb4Q9jZ_TNqIbCqPYQr2KMi6fN2') },
  { type: 'image', url: img('1ZooZOHoYDiuN57S0Tr5SE-lyRGZLF0PO'), thumbnailUrl: img('1ZooZOHoYDiuN57S0Tr5SE-lyRGZLF0PO') },
  { type: 'image', url: img('1F3Fty-81augcuN5Vk_lbbC16PgarRx36'), thumbnailUrl: img('1F3Fty-81augcuN5Vk_lbbC16PgarRx36') },
  { type: 'image', url: img('16LBDm21Jes05WuONAxc9iMMBsOPcRaV_'), thumbnailUrl: img('16LBDm21Jes05WuONAxc9iMMBsOPcRaV_') },
];

const SOCIAL_DISTANCING_MEDIA: ProjectMedia[] = [
  { type: 'image', url: img('1kmoFgW39oohL5DfLriTQ0a_mZAWtSJ7J'), thumbnailUrl: img('1kmoFgW39oohL5DfLriTQ0a_mZAWtSJ7J') },
  { type: 'image', url: img('1SlgC9bbhy9ZMDzwPIMKOpRxxMliRW1Il'), thumbnailUrl: img('1SlgC9bbhy9ZMDzwPIMKOpRxxMliRW1Il') },
  { type: 'image', url: img('110XCWyzo6f7jGI15fPJeeLGJBPY9ESXp'), thumbnailUrl: img('110XCWyzo6f7jGI15fPJeeLGJBPY9ESXp') },
  { type: 'image', url: img('1sYJjPO25bBWmFESYJz4aEX98fv-2KrBq'), thumbnailUrl: img('1sYJjPO25bBWmFESYJz4aEX98fv-2KrBq') },
];

const CHIMUELO_MEDIA: ProjectMedia[] = [
  // Videos
  { type: 'video', ...yt('QlKLrcfidWo') },
  { type: 'video', ...yt('7XYEKnYFyLU') },
  { type: 'video', ...yt('1yZ72Qlav94') },
  { type: 'video', ...yt('219f_qOjt9o') },
  { type: 'video', ...yt('0oZzWAdRtgM') },
  { type: 'video', ...yt('W-Rrc6gF1Tk') },
  { type: 'video', ...yt('nfD-xSYmnGc') },

  // Existing Images
  { type: 'image', url: img('19L-qM_ZSCzjj5YlJEt1qRulLGXLetNM9'), thumbnailUrl: img('19L-qM_ZSCzjj5YlJEt1qRulLGXLetNM9') },
  { type: 'image', url: img('16lbtTptx-msdYKdpaEvd2cNS7e4mdHI4'), thumbnailUrl: img('16lbtTptx-msdYKdpaEvd2cNS7e4mdHI4') },
  { type: 'image', url: img('1VgMcFrCb68yHFVi5ne8H0KoRmKeDY_45'), thumbnailUrl: img('1VgMcFrCb68yHFVi5ne8H0KoRmKeDY_45') },
  { type: 'image', url: img('13H_w-o_tLQtXvgWyxQfIAA8f0JE-9BXu'), thumbnailUrl: img('13H_w-o_tLQtXvgWyxQfIAA8f0JE-9BXu') },
  { type: 'image', url: img('1NoXO_Xq5LviAaIeVx15JpsYJtL5XQHXv'), thumbnailUrl: img('1NoXO_Xq5LviAaIeVx15JpsYJtL5XQHXv') },
  { type: 'image', url: img('1oFDRVCt8gIYQ3mztbMGVK6nsNrB3HTCb'), thumbnailUrl: img('1oFDRVCt8gIYQ3mztbMGVK6nsNrB3HTCb') },
];

const AGROBOT_MEDIA: ProjectMedia[] = [
  { type: 'video', ...yt('o8WOsCvfmio') }, // New Agrobot Video
  { type: 'video', ...yt('_yPH_xinLjA') },
  { type: 'video', ...yt('Om3_KIQIbts') },
  { type: 'image', url: img('18rKBLA7YZup_9Q8xl-FrvrrxKeizfW5d'), thumbnailUrl: img('18rKBLA7YZup_9Q8xl-FrvrrxKeizfW5d') },
  { type: 'image', url: img('1c9xSGCuAdLi88nW1VyQM8rER4R4aBeyH'), thumbnailUrl: img('1c9xSGCuAdLi88nW1VyQM8rER4R4aBeyH') },
  { type: 'image', url: img('10_j6H3kaKV6q50d1ihhry-fQofSd9xxl'), thumbnailUrl: img('10_j6H3kaKV6q50d1ihhry-fQofSd9xxl') },
  { type: 'image', url: img('1OMqm9l5ADiG4E5R-PERW0Hl_oyTNivky'), thumbnailUrl: img('1OMqm9l5ADiG4E5R-PERW0Hl_oyTNivky') },
  { type: 'image', url: img('10tu6llRTYJKqAqpb845Zhv5zkVEpxBvm'), thumbnailUrl: img('10tu6llRTYJKqAqpb845Zhv5zkVEpxBvm') },
  { type: 'image', url: img('1NLHi4xCJspNw16buphrlT63qGqbSCWe5'), thumbnailUrl: img('1NLHi4xCJspNw16buphrlT63qGqbSCWe5') },
  { type: 'image', url: img('1CQy3-oUUXQuDbon9IBpYIuhVuaTs5meU'), thumbnailUrl: img('1CQy3-oUUXQuDbon9IBpYIuhVuaTs5meU') },
  { type: 'image', url: img('1nMCRCCRikOTZzX5lpzpjlZPO0BTq1MgU'), thumbnailUrl: img('1nMCRCCRikOTZzX5lpzpjlZPO0BTq1MgU') },
  { type: 'image', url: img('109a9C3NqN6lFHVTNnj1QyAXrnwnjakfy'), thumbnailUrl: img('109a9C3NqN6lFHVTNnj1QyAXrnwnjakfy') },
  { type: 'image', url: img('1EBgFFxrts0Ah2o6bdTEHeGZzgwIWV3UK'), thumbnailUrl: img('1EBgFFxrts0Ah2o6bdTEHeGZzgwIWV3UK') },
  { type: 'image', url: img('1Th9gFYBBr3zDLmtgLj1Wpv4dXpJdNMHz'), thumbnailUrl: img('1Th9gFYBBr3zDLmtgLj1Wpv4dXpJdNMHz') },
];

const BUGATTI_MEDIA: ProjectMedia[] = [
  // New Bugatti Videos
  { type: 'video', ...yt('6tbIaPripzI') },
  { type: 'video', ...yt('F6zm4BWgrck') },
  // Existing Images
  { type: 'image', url: img('1nvrB5othalLiUAMngtaEVkaXwmp-IjYE'), thumbnailUrl: img('1nvrB5othalLiUAMngtaEVkaXwmp-IjYE') },
  { type: 'image', url: img('1u-BCiRiXw8oU8WWKjOEM1XuA02uSU5dr'), thumbnailUrl: img('1u-BCiRiXw8oU8WWKjOEM1XuA02uSU5dr') },
  { type: 'image', url: img('1KC-MmGlrR6tb0de9iVppMjZ56kDSlngB'), thumbnailUrl: img('1KC-MmGlrR6tb0de9iVppMjZ56kDSlngB') },
  { type: 'image', url: img('1yShIiRHY4B1gLMvkv_Sl_MvPD7wYIwvg'), thumbnailUrl: img('1yShIiRHY4B1gLMvkv_Sl_MvPD7wYIwvg') },
  { type: 'image', url: img('1_Hq5MPMqf_MpTmWuamR5aB9lT8TdnDDr'), thumbnailUrl: img('1_Hq5MPMqf_MpTmWuamR5aB9lT8TdnDDr') },
  { type: 'image', url: img('1-HysBknSW0D02s1ERstmj3wRGsFn-DFW'), thumbnailUrl: img('1-HysBknSW0D02s1ERstmj3wRGsFn-DFW') },
  { type: 'image', url: img('1ihLSOwfvl23KQzJUlpGtuPE_xpUnPvpZ'), thumbnailUrl: img('1ihLSOwfvl23KQzJUlpGtuPE_xpUnPvpZ') },
  { type: 'image', url: img('14juoyr_DcrLDzVwC3tvPQGErOS4GBt02'), thumbnailUrl: img('14juoyr_DcrLDzVwC3tvPQGErOS4GBt02') },
  { type: 'image', url: img('1eBNEyo4zbP4aaPzIvU8XG3dcKVYyqOY7'), thumbnailUrl: img('1eBNEyo4zbP4aaPzIvU8XG3dcKVYyqOY7') },
  { type: 'image', url: img('1gw3wxF470B5oEKst0SpDds2uwmC2Vlq5'), thumbnailUrl: img('1gw3wxF470B5oEKst0SpDds2uwmC2Vlq5') },
  { type: 'image', url: img('1gQm-oCK5ZVMGH1N_0V2Cqme9bzlyJo7i'), thumbnailUrl: img('1gQm-oCK5ZVMGH1N_0V2Cqme9bzlyJo7i') },
  { type: 'image', url: img('1qPLFiQejkHhLjBGPDW-BvvgoftEllW3M'), thumbnailUrl: img('1qPLFiQejkHhLjBGPDW-BvvgoftEllW3M') },
  { type: 'image', url: img('1w9Lg0DB_Md5irn1ZVMTqZVpX4O7Y4eYQ'), thumbnailUrl: img('1w9Lg0DB_Md5irn1ZVMTqZVpX4O7Y4eYQ') },
  { type: 'image', url: img('1u1c4g2g_wybFZi0az4GsDvyJznp2Thcb'), thumbnailUrl: img('1u1c4g2g_wybFZi0az4GsDvyJznp2Thcb') },
  { type: 'image', url: img('10NbQfAAPtMSF-2jKlfnBrSsaeNLHiYo_'), thumbnailUrl: img('10NbQfAAPtMSF-2jKlfnBrSsaeNLHiYo_') },
  { type: 'image', url: img('14pSiiZkLYUxbyTFPgSVtT34OrNmMZlRm'), thumbnailUrl: img('14pSiiZkLYUxbyTFPgSVtT34OrNmMZlRm') },
  { type: 'image', url: img('1z3wpu_JHrXSprN6ChYMKqM9clXnm9Yiz'), thumbnailUrl: img('1z3wpu_JHrXSprN6ChYMKqM9clXnm9Yiz') },
  { type: 'image', url: img('1weXXXO_CReabTABmFyvmmt19B4BwLlnN'), thumbnailUrl: img('1weXXXO_CReabTABmFyvmmt19B4BwLlnN') },
];

const BRENT_MEDIA: ProjectMedia[] = [
  { type: 'image', url: img('1HXGDcVwNxa3jYMG8LNDyJcW0IbAje5K8'), thumbnailUrl: img('1HXGDcVwNxa3jYMG8LNDyJcW0IbAje5K8') },
  { type: 'image', url: img('1MVYnLzhJEVi15UZF-1FJSA4rDNJAWuge'), thumbnailUrl: img('1MVYnLzhJEVi15UZF-1FJSA4rDNJAWuge') },
  { type: 'image', url: img('1UXGvcTDHHN8ZS7BZd81HbwrOQeMeFlow'), thumbnailUrl: img('1UXGvcTDHHN8ZS7BZd81HbwrOQeMeFlow') },
  { type: 'image', url: img('1UPpovEXAYxCPwO7Hqp7A1kW-7AAbYuah'), thumbnailUrl: img('1UPpovEXAYxCPwO7Hqp7A1kW-7AAbYuah') },
  { type: 'image', url: img('1AHEoBb66mu3RGAveKMywLjE6jbE_zlt-'), thumbnailUrl: img('1AHEoBb66mu3RGAveKMywLjE6jbE_zlt-') },
  { type: 'image', url: img('1xfK09-OkDWBpSlcOnID1TlrgKnKqnHz7'), thumbnailUrl: img('1xfK09-OkDWBpSlcOnID1TlrgKnKqnHz7') },
];

// Static Images for tricky previews (like .mil sites that block crawlers)
const PREVIEWS = {
  fac: "https://poderespacial.fac.mil.co/sites/aeroespacial/files/Imagenespoderaeroespacial/CITAE2.png"
};

// --- ICONS & ASSETS ---
// Using CDN for official logos (Devicon & SimpleIcons)
const LOGOS = {
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  matlab: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg",
  cpp: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  kotlin: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",

  pytorch: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  tensorflow: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  keras: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg",
  // Updated Ultralytics logo (User Provided)
  ultralytics: "https://yt3.googleusercontent.com/KXE774Pc9EOxkDiofkZFEZeoTpF6SDUd3UAvJBr7u_7YxNh4UvgSySarpT6utWusVz_oTdLbAw=s900-c-k-c0x00ffffff-no-rj",
  // Updated MLflow logo (User Provided)
  mlflow: "https://mlflow.org/docs/latest/api_reference/_static/MLflow-logo-final-black.png",
  scikitlearn: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",

  pandas: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  numpy: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  matplotlib: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg",
  seaborn: "https://raw.githubusercontent.com/mwaskom/seaborn/master/doc/_static/logo-mark-lightbg.svg",

  fastapi: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  flask: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",

  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  azure: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  linux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  sqlserver: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg",
  ros: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ros/ros-original.svg",
  vagrant: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vagrant/vagrant-original.svg",

  // Concepts (using generic or representative icons)
  deeplearning: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
  computervision: "https://cdn-icons-png.flaticon.com/512/3615/3615243.png",
  llms: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", // Representative
  scrum: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg", // Jira as proxy for Scrum
  docs: "https://cdn-icons-png.flaticon.com/512/2965/2965335.png",
  code: "https://cdn-icons-png.flaticon.com/512/1005/1005141.png",
};

// --- SKILLS DATA CONSTRUCTOR ---
const SKILLS_DATA_EN: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Python", url: "https://www.python.org/", icon: LOGOS.python },
      { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", icon: LOGOS.javascript },
      { name: "MATLAB", url: "https://www.mathworks.com/products/matlab.html", icon: LOGOS.matlab },
      { name: "C++", url: "https://isocpp.org/", icon: LOGOS.cpp },
      { name: "Kotlin", url: "https://kotlinlang.org/", icon: LOGOS.kotlin }
    ]
  },
  {
    category: "AI & Machine Learning",
    skills: [
      { name: "Deep Learning", url: "https://www.ibm.com/topics/deep-learning", icon: LOGOS.deeplearning },
      { name: "Computer Vision", url: "https://www.ibm.com/topics/computer-vision", icon: LOGOS.computervision },
      { name: "PyTorch", url: "https://pytorch.org/", icon: LOGOS.pytorch },
      { name: "TensorFlow", url: "https://www.tensorflow.org/", icon: LOGOS.tensorflow },
      { name: "Keras", url: "https://keras.io/", icon: LOGOS.keras },
      { name: "Ultralytics", url: "https://www.ultralytics.com/", icon: LOGOS.ultralytics },
      { name: "MLflow", url: "https://mlflow.org/", icon: LOGOS.mlflow },
      { name: "Scikit-learn", url: "https://scikit-learn.org/", icon: LOGOS.scikitlearn },
      { name: "LLMs", url: "https://en.wikipedia.org/wiki/Large_language_model", icon: LOGOS.llms }
    ]
  },
  {
    category: "Data Science",
    skills: [
      { name: "Pandas", url: "https://pandas.pydata.org/", icon: LOGOS.pandas },
      { name: "NumPy", url: "https://numpy.org/", icon: LOGOS.numpy },
      { name: "Matplotlib", url: "https://matplotlib.org/", icon: LOGOS.matplotlib },
      { name: "Seaborn", url: "https://seaborn.pydata.org/", icon: LOGOS.seaborn }
    ]
  },
  {
    category: "Backend & API",
    skills: [
      { name: "FastAPI", url: "https://fastapi.tiangolo.com/", icon: LOGOS.fastapi },
      { name: "Flask", url: "https://flask.palletsprojects.com/", icon: LOGOS.flask },
      { name: "REST APIs", url: "https://restfulapi.net/", icon: "https://cdn-icons-png.flaticon.com/512/8297/8297437.png" }
    ]
  },
  {
    category: "DevOps & Databases",
    skills: [
      { name: "Git", url: "https://git-scm.com/", icon: LOGOS.git },
      { name: "Azure", url: "https://azure.microsoft.com/", icon: LOGOS.azure },
      { name: "Docker", url: "https://www.docker.com/", icon: LOGOS.docker },
      { name: "Vagrant", url: "https://www.vagrantup.com/", icon: LOGOS.vagrant },
      { name: "Linux", url: "https://www.linux.org/", icon: LOGOS.linux },
      { name: "MongoDB", url: "https://www.mongodb.com/", icon: LOGOS.mongodb },
      { name: "SQL Server", url: "https://www.microsoft.com/sql-server", icon: LOGOS.sqlserver },
      { name: "ROS", url: "https://www.ros.org/", icon: LOGOS.ros }
    ]
  },
  {
    category: "Methodologies",
    skills: [
      { name: "SCRUM", url: "https://learn.microsoft.com/es-es/devops/plan/what-is-scrum", icon: LOGOS.scrum },
      { name: "Tech Docs", icon: LOGOS.docs },
      { name: "Code Review", url: "https://google.github.io/eng-practices/review/", icon: LOGOS.code }
    ]
  }
];

// Reusing same structure for Spanish, just translating category names if needed
const SKILLS_DATA_ES: SkillCategory[] = [
  {
    category: "Lenguajes de Programación",
    skills: SKILLS_DATA_EN[0].skills
  },
  {
    category: "IA y Machine Learning",
    skills: SKILLS_DATA_EN[1].skills
  },
  {
    category: "Ciencia de Datos",
    skills: SKILLS_DATA_EN[2].skills
  },
  {
    category: "Backend y API",
    skills: SKILLS_DATA_EN[3].skills
  },
  {
    category: "DevOps y Bases de Datos",
    skills: SKILLS_DATA_EN[4].skills
  },
  {
    category: "Metodologías",
    skills: [
      { name: "SCRUM", url: "https://learn.microsoft.com/es-es/devops/plan/what-is-scrum", icon: LOGOS.scrum },
      { name: "Doc. Técnica", icon: LOGOS.docs },
      { name: "Revisión Código", url: "https://google.github.io/eng-practices/review/", icon: LOGOS.code }
    ]
  }
];

// --- CERTIFICATIONS DATA ---
const CERTIFICATIONS_DATA: Certification[] = [
  {
    name: "Certified SOLIDWORKS Associate (CSWA)",
    issuer: "Dassault Systèmes",
    date: "2019",
    documents: [{ label: "Certificate", url: DOCS.cswaCert }]
  },
  {
    name: "Object Tracking for Computer Vision",
    issuer: "Coursera",
    date: "2020",
    documents: [{ label: "Certificate", url: DOCS.cvTrackingCert }]
  },
  {
    name: "Digital Image Processing",
    issuer: "Coursera",
    date: "2020",
    documents: [{ label: "Certificate", url: DOCS.imgProcCert }]
  },
  {
    name: "COVID-19 Contact Tracing",
    issuer: "Johns Hopkins University",
    date: "2020",
    documents: [{ label: "Certificate", url: DOCS.covidCert }]
  }
];

// --- ENGLISH DATA ---
const DATA_EN: ResumeData = {
  name: "Luis Felipe Tobar Sotelo",
  title: [
    { label: "Machine Learning Engineer", url: URLS.mlEngineer },
    { label: "Python Backend Developer", url: URLS.pythonBackend },
    { label: "Mechatronics Engineer", url: URLS.mechatronics },
    { label: "AI Specialist", url: URLS.aiSpecialist },
    { label: "Robotics", url: URLS.robotics },
    { label: "Computer Vision", url: URLS.computerVision },
    { label: "Deep Learning", url: URLS.deepLearning },
    { label: "CAD", url: URLS.cad }
  ],
  about: `Mechatronics Engineer and Artificial Intelligence Specialist with more than 4 years of experience in the research and development of Python-based software. In my role as a Technical Lead, I focus on the entire journey of Machine Learning and Computer Vision projects, taking them from the first experimental benchmarks to a fully deployed, production-ready state.

My work is centered on connecting deep learning research with solid software engineering. Throughout my career, I have focused on:

• Leading cross-functional teams including ML developers, backend and frontend engineers, and annotators to build custom solutions that integrate web architectures with advanced AI models.

• Designing high-performance technical systems, specifically REST APIs, microservices, and inference pipelines that are optimized to run efficiently even on limited hardware.

• Managing the end-to-end data lifecycle, which includes everything from database schema design and containerized deployments with Docker to the processing of large-scale, high-dimensional datasets.

My professional background is rooted in applied engineering and open-source methodologies. This path began as a researcher in the Robotics and Autonomous Systems (RAS) group at Universidad Autónoma de Occidente and continued through key roles at Manglar (CNX SAS) and CITAE. My goal is always to transform complex technology into practical, high-efficiency tools that simplify decision-making and ensure effective knowledge transfer within technical teams.`,
  contact: {
    email: "lftobar14@gmail.com",
    phone: "+573013189355",
    location: "Medellín, Colombia",
    linkedin: "https://www.linkedin.com/in/luis-felipe-tobar-sot",
    github: "https://github.com/felipetobars",
    orcid: "https://orcid.org/0009-0000-5634-8901",
    researchgate: "https://www.researchgate.net/profile/Luis-Tobar-2",
  },
  experience: [
    {
      id: "codaltec-lead",
      role: "Technical Lead & Machine Leaning Developer",
      company: (
        <>
          <LinkPreview href="https://codaltec.com/" className="hover:text-primary hover:underline transition-colors">CODALTEC - High Technology Corporation for Defense</LinkPreview>
          {' '}
          <LinkPreview
            href="https://poderespacial.fac.mil.co/es/centro-de-investigacion-en-tecnologias-aeroespaciales"
            previewImage={PREVIEWS.fac}
            className="hover:text-primary hover:underline transition-colors"
          >
            (CITAE - Aerospace Technologies Research Center | Colombian Air Force)
          </LinkPreview>
          <span className="text-slate-400"> - Cali, Colombia (Remote)</span>
        </>
      ),
      period: "Present — Nov 2023",
      description: "Lead a multidisciplinary software development team (**ML**, **Backend**, **Frontend**, and Annotators) in the design, testing, and deployment of advanced **computer vision** solutions for internal stakeholders. The role focuses on integrating **deep learning** models into production environments through robust web architectures and **REST APIs**, specifically optimized for large-scale geospatial and satellite data analysis. Key responsibilities include overseeing hardware infrastructure, managing the development lifecycle with **Docker Compose** and **MongoDB**, and ensuring high-efficiency execution on resource-constrained hardware.",
      details: `**Stage 1: Specialized Consultancy | Raster Analysis Optimization**
(November 2023 – January 2024)

**Functions**
• Designed and optimized tiling and preprocessing pipelines for large-scale satellite imagery.
• Developed backend components in **Python** and constructed **REST APIs** to integrate preliminary AI models.
• Supervised satellite data processing and airborne sensor tasks within **GIS** software environments.
• Coordinated quality validation for image annotation and prepared scientific documentation for system architecture.

**Achievements**
• **Resolved Geometric Discontinuities:** Developed a custom algorithm with adjustable tile overlapping and geometric merge logic, eliminating gaps between adjacent detection masks in production rasters.
• **Pipeline Standardization:** Successfully corrected segmentation gaps, ensuring continuous and reliable polygon generation for large-scale geospatial datasets.

**Stage 2: Scope Expansion | Mining, Deforestation & Performance**
(February 2024 – October 2024)

**Functions**
• Led a cross-functional team to expand software capabilities from Mining detection to regional **Deforestation** analysis in the Amazon region.
• Evaluated and benchmarked modern detection/segmentation architectures using **PyTorch**, tracking experiments and model versions with **MLflow**.
• Engineered high-efficiency functions optimized for edge execution and resource-constrained hardware.
• Managed multi-sensor data integration (SkySat, GeoEye, PlanetScope, WorldView 2/3, ADS80/100).

**Achievements**
• **Performance Optimization:** Achieved a **2.7x increase** in inference throughput by implementing a **Producer-Consumer multiprocessing** prediction pipeline.
• **Technical Innovation:** Implemented real-time **16-bit to 8-bit** conversion, eliminating manual pre-processing and enabling direct processing of **GeoTIFFs**.
• **Model Evolution:** Created specialized, lightweight models per sensor type using architectures such as **[YOLOv7-v11](https://docs.ultralytics.com/#yolo-a-brief-history)**, **[RT-DETR](https://docs.ultralytics.com/models/rtdetr/)**, **[SegFormer](https://huggingface.co/docs/transformers/model_doc/segformer)**, and **[U-Net](https://github.com/sevakon/unet-keras)**.
• **Environmental Impact:** Developed temporal analysis modules to track forest loss and recovery over time.

**Stage 3: Hybrid Methodologies & Operational Automation**
(November 2024 – Present)

**Functions**
• Designing a hybrid neural network methodology to identify large linear infrastructure (paths) spanning multiple tiles.
• Engineering **Python** backend endpoints and managing **MongoDB** database architecture for complex data structures.
• Overseeing containerized deployments using **Docker Compose** and coordinating seamless integration with the Frontend and DevOps teams.
• Managing the end-to-end development lifecycle for new system features and semantic context modules.

**Achievements**
• **Context Loss Solution:** Co-developed a hybrid methodology combining **[YOLOv11](https://docs.ultralytics.com/models/yolo11/)** (ROI detection) and **[SegFormer](https://huggingface.co/docs/transformers/model_doc/segformer)** (Context-aware Semantic Segmentation), successfully solving context loss in objects spanning multiple tiles.
• **Workflow Automation:** Engineered an automated reporting system (backend **PPTX** generation), reducing analyst workload from **days/weeks** to just **minutes/hours**.
• **System Architecture:** Standardized deliverables and operational workflows, significantly increasing the department's analytical capacity.`,
      media: CODALTEC_LEAD_MEDIA,
      technologies: ["Python", "YOLOv11", "SegFormer", "MongoDB", "Flask", "Docker", "PyTorch", "RT-DETR"],
      references: [
        { name: "Paola Andrea Zárate Luna", role: "AI Project Director CITAE (2023-2024)", phone: "+573184383930", email: "paola.zarate@fac.mil.co" },
        { name: "Alejandro Carvajal González", role: "Principal Investigator for Geomask and Pistas projects at CITAE (2023-2025)", phone: "+573153404327" }
      ]
    },
    {
      id: "manglar",
      role: "Machine Learning Developer",
      company: (
        <>
          <LinkPreview href="https://www.manglar.com/" className="hover:text-primary hover:underline transition-colors">CNX S.A.S. - MANGLAR</LinkPreview>
          <span className="text-slate-400"> - Cali, Colombia (Remote)</span>
        </>
      ),
      period: "Jul 2023 — Aug 2022",
      description: "Machine Learning Developer responsible for the end-to-end lifecycle of **Deep Learning** solutions for precision agriculture, covering data engineering, annotation strategy, model development, optimization, and support for production deployment. Worked with **Python** and **TensorFlow** to design scalable pipelines for large-scale drone imagery, supervised data quality processes, authored comprehensive technical documentation, and collaborated with backend, infrastructure, and DevOps teams to operationalize trained models.",
      details: `**Functions**
• Define, train, and optimize neural network models for **semantic segmentation** and **object detection** using **Python** and **TensorFlow**, ensuring high performance through systematic testing and debugging.
• Design data acquisition strategies by engineering **SQL** queries on **SQL Server** databases hosted on **Azure** infrastructure to filter and retrieve historical **sub-metric drone imagery** (**GeoTIFF RGB**) based on plantation phenology criteria (age, weed coverage, acquisition date).
• Develop **Python**-based preprocessing pipelines to tile large drone mosaics into neural-network-ready image patches.
• Define data annotation strategies by authoring technical manuals with strict identification rules and supervising labeling teams using **VGG Image Annotator**.
• Perform rigorous quality assurance on annotations, correcting geometry errors and missing labels prior to dataset consolidation, including duplicate cleaning, train/validation/test splits, and **data augmentation**.
• Engineer and customize **Deep Learning** architectures for different use cases, including **semantic segmentation** and **object detection** workflows.
• Co-design **multiprocessing** pipelines following a **Producer–Consumer** pattern to parallelize tiling, batching, and inference stages.
• Develop backend **Python** functions consumed by **REST APIs** hosted on **Azure** servers.
• Manage model training environments on on-premise servers and **Azure** virtual machines via **SSH**/**FortiClient**.
• Collaborate closely with backend, infrastructure, and DevOps teams to package trained models and support their deployment into production systems.
• Produce detailed technical documentation for software components, model architectures, and data workflows to support maintainability and knowledge transfer.

**Achievements**
• Improved sugar cane segmentation accuracy by evolving the workflow from a color-index-based approach (TGI) to a customized **[DeepLabV3+](https://keras.io/examples/vision/deeplabv3_plus/)** semantic segmentation model, significantly reducing false positives caused by weeds without compromising processing speed.
• Reduced prediction time by approximately **9×** by upgrading from a sequential **[Mask R-CNN](https://github.com/matterport/Mask_RCNN)** workflow to a customized **[RetinaNet](https://keras.io/examples/vision/retinanet/)**-based solution and implementing a **multiprocessing** **Producer–Consumer** pipeline.
• Expanded model capabilities by training additional **[DeepLabV3+](https://keras.io/examples/vision/deeplabv3_plus/)** models for multi-class scenarios, including crops, soil, residues, weeds, stones, and water bodies.
• Increased dataset reliability and training stability by reducing annotation errors and missing labels by **over 80%** through strict QA processes, duplicate removal, and controlled dataset splitting with augmentation.
• Supported production deployment activities by delivering backend-ready **Python** modules and comprehensive technical documentation, shortening integration cycles and reducing rework during system rollout.`,
      media: MANGLAR_MEDIA,
      technologies: ["Python", "TensorFlow", "Keras", "SQL Server", "Azure Servers", "Multiprocessing", "Linux"],
      references: [
        { name: "Jonathan Rincón Morales", role: "Technical Lead Manglar", linkedin: "https://www.linkedin.com/in/jonathan-rinc%C3%B3n-morales-5716b838" }
      ]
    },
    {
      id: "codaltec-researcher",
      role: "Artificial Intelligence Researcher",
      company: (
        <>
          <LinkPreview href="https://codaltec.com/" className="hover:text-primary hover:underline transition-colors">CODALTEC - High Technology Corporation for Defense</LinkPreview>
          {' '}
          <LinkPreview
            href="https://poderespacial.fac.mil.co/es/centro-de-investigacion-en-tecnologias-aeroespaciales"
            previewImage={PREVIEWS.fac}
            className="hover:text-primary hover:underline transition-colors"
          >
            (CITAE - Aerospace Technologies Research Center | Colombian Air Force)
          </LinkPreview>
          <span className="text-slate-400"> - Cali, Colombia (Hybrid)</span>
        </>
      ),
      period: "Aug 2022 — Apr 2021",
      description: "Generated, designed and tested computer-vision functionalities, deployment environments and hardware infrastructure for applying artificial neural networks to geospatial and satellite data. Explored and supervised satellite-data processing and airborne-sensor tasks using **Python** and GIS tools (**QGIS**, **ArcGIS Pro**). Produced scientific documentation to support research and led knowledge-transfer sessions to train research-center staff in **Machine Learning** and **Deep Learning**.",
      details: `**Functions**
• Conduct research and feasibility studies on applying **ML** and **Deep Learning** techniques to detect open-pit gold mining patterns (land removal, chemical pools, machinery, dredges), progressing from **ML clustering** baselines to **CNN**-based approaches.
• Evaluate, benchmark and compare instance/segmentation architectures (**[Mask R-CNN](https://github.com/matterport/Mask_RCNN)** implemented in **TensorFlow** vs **[YOLACT](https://github.com/dbolya/yolact)** implemented in **PyTorch**), executing **transfer learning**, **fine-tuning** and controlled experiments to assess accuracy, scalability and deployment constraints.
• Supervise dataset construction and annotation workflows: coordinate with CITAE/FAC annotators, define QA rules for geometries and class labels, and implement data-cleaning procedures (duplicate removal, train/val/test splits).
• Design and implement deterministic **data augmentation** and preprocessing pipelines to improve dataset robustness for training and inference.
• Develop analyst-facing validation tools and software prototypes in **Python** (**PySide2**) for raster/vector visualization, authentication, analysis history and **GeoJSON**/**Shapefile** export (**QGIS**/**ArcGIS** interoperability).
• Prepare scientific reports and consolidate experimental methodology and results for peer review and institutional adoption; deliver hands-on training and knowledge transfer to operational staff.

**Achievements**
• Improved mining-pattern identification accuracy by **≥13% mAP** after reorganizing the experimental pipeline and selecting **[Mask R-CNN](https://github.com/matterport/Mask_RCNN)** over **[YOLACT](https://github.com/dbolya/yolact)** based on empirical performance and deployment considerations.
• Reduced large satellite and aerial raster analysis turnaround time by **≥80%** through delivery of the **PySide2** desktop prototype (visualization, auth, analysis history, **GeoJSON**/**Shapefile** export), enabling much faster validation and decision cycles for analysts.
• Decreased dataset correction and relabeling effort by **>50%** by enforcing strict annotation standards, applying QA, and introducing controlled augmentation, which stabilized retraining iterations and reduced relabeling cycles.
• Consolidated research outcomes into a peer-reviewed publication and enabled institutional adoption (**[paper presented at IEEE COLCACI 2024](https://drive.google.com/file/d/1lRXvr_HzWHhUEXA-N07-I23jFKiWBqdV/view)**), facilitating technology transfer within the research center.`,
      media: CITAE_RESEARCHER_MEDIA,
      technologies: ["Python", "TensorFlow", "PyTorch", "PySide2", "Computer Vision", "QGIS", "ArcGIS Pro"],
      references: [
        { name: "Paola Andrea Zárate Luna", role: "Principal Investigator for Geomask project at CITAE (2020-2022)", phone: "+573184383930", email: "paola.zarate@fac.mil.co" }
      ]
    }
  ],
  skills: SKILLS_DATA_EN,
  education: [
    {
      id: "specialist",
      degree: "Artificial Intelligence Specialist (Postgraduate Degree)",
      degreeUrl: "https://virtual.uao.edu.co/blog/especializacion-en-inteligencia-artificial-plan-de-estudios",
      institution: "Universidad Autónoma de Occidente",
      period: "2020 — 2021",
      details: ["Santiago de Cali, Colombia"],
      documents: [
        { label: "Diploma", url: DOCS.specDiploma },
        { label: "Transcript", url: DOCS.specActa }
      ]
    },
    {
      id: "bachelor",
      degree: "Mechatronics Engineer (Bachelor Degree)",
      degreeUrl: "https://www.uao.edu.co/programa/ingenieria-mecatronica/",
      institution: "Universidad Autónoma de Occidente",
      period: "2015 — 2020",
      details: [
        "Santiago de Cali, Colombia",
        "Thesis Scholarship at HEIG-VD, Switzerland (Discontinued in 2020).",
        "Academic Honors: 2016 y 2019"
      ],
      documents: [
        { label: "Diploma", url: DOCS.bachDiploma },
        { label: "Transcript", url: DOCS.bachActa }
      ]
    }
  ],
  workProjects: [],
  academicProjects: [
    {
      id: "easy-tiffvisor",
      title: "Easy TiffVisor: Massive Satellite Image Visualization",
      year: "2025 (In Dev)",
      academicContext: "applied",
      description: "High-performance desktop application designed for instant visualization and analysis of large-scale geospatial images (GeoTIFF). Its architecture eliminates traditional GIS barriers by implementing On-the-Fly Rendering, allowing multi-gigabyte files to be explored in seconds. It efficiently extracts and processes only visible pixels in real-time, supporting dynamic spectral manipulation, statistical contrast adjustment for 16-bit data, and vector measurement tools, utilizing an Electron and Leaflet frontend connected to a Python/GDAL backend via XYZ protocol.",
      technologies: ["Electron", "JavaScript", "Python", "Flask", "GDAL", "Rasterio", "NumPy", "Leaflet", "Mercantile"],
      media: EASY_TIFFVISOR_MEDIA,
      links: [
        { url: "https://github.com/felipetobars/easy_tiffvisor/tree/geo_electron", type: "github" }
      ]
    },
    {
      id: "easy-whisper",
      title: "Easy Whisper: Smart Voice-to-Text",
      year: "2025 (In Dev)",
      academicContext: "applied",
      description: "Desktop application designed to automate real-time audio transcription using OpenAI's Whisper model. It converts voice to text with high precision and efficiency, running entirely locally on the user's machine. The application facilitates direct audio capture from any microphone, features a visual interface with sound intensity indicators, provides global hotkeys for background control, and includes automatic typing functionality to paste transcribed text directly into the active application.",
      technologies: ["Python", "OpenAI Whisper", "PySide6", "PyTorch", "Sounddevice", "NumPy", "PyAutoGUI", "Conda"],
      media: EASY_WHISPER_MEDIA,
      links: [
        { url: "https://github.com/felipetobars/easy_whisper", type: "github" }
      ]
    },
    {
      id: "proj-5",
      title: "Bugatti 3D Modeling & Simulation",
      year: "2019",
      academicContext: "bachelor",
      description: "3D modeling and simulation of a Bugatti vehicle using SolidWorks. The project involved the detailed Computer-Aided Design (CAD) of the car's exterior body and mechanical components based on reference blueprints. Key activities included the complex surface modeling of the chassis, Aerodynamic analysis using Flow Simulation to evaluate drag and airflow, and a dynamic simulation of the suspension system to test mechanical performance under load.",
      technologies: ["SolidWorks", "CAD", "Flow Simulation", "Mechanical Design"],
      media: BUGATTI_MEDIA
    },
    {
      id: "proj-4",
      title: "Agrobot (Agricultural Robot)",
      year: "2019",
      academicContext: "bachelor",
      description: "Design and implementation of Mobile robot for the physical characterization of Duranta Arbustives to help the identification of the Nysius Ericae pest on the nursery garden of Universidad Autónoma de Occidente: Developed a land robot using the concurrent design methodology. SolidWorks software was used for the design, carrying out stress analysis with finite elements. To teleoperate it, the ROS middleware was used, which receives the user's commands through an SSH connection or through Bluetooth. Based on these inputs, the corresponding linear and angular velocities are published and transformed into angular velocities for each wheel using the robot's direct and inverse kinematics (differential type). The stage of detection of the pest is under development but approximations have been made using image processing with OpenCV.",
      technologies: ["ROS", "SolidWorks", "Python", "OpenCV", "Linux", "C++", "Rviz", "Gazebo", "YAML"],
      media: AGROBOT_MEDIA,
      links: [
        { url: "https://github.com/alejoxbg/Agrobot", type: "github" },
        { url: "https://www.researchgate.net/publication/337988611_AGROBOT-InformeFinaldocx", type: "researchgate" }
      ]
    },
    {
      id: "proj-3",
      title: "Guidance Robot",
      year: "2020",
      repoUrl: "https://www.researchgate.net/publication/347270395_REDESIGN_OF_CHIMUELO_LAND_EXPLORATION_VEHICLE_FOR_GUIDANCE_WORK_IN_THE_LABORATORIES_OF_BASEMENTS_2_OF_THE_UNIVERSIDAD_AUTONOMA_DE_OCCIDENTE",
      academicContext: "bachelor",
      description: "Starting from a disused robot from the university's robotics research seedbed, a robotic perception system was proposed to provide computational vision to the robot. For this, a depth camera was used to obtain a point cloud which is processed RTAB-Map library for ROS and displayed in Rviz. The robot is capable of making a 3D map of the working environment and then being able to locate itself in it, extracting characteristics from the point cloud and using a particle filter. The techniques developed in this project are general, so they can be implemented in other robots or systems. All renders were done using SolidWorks.",
      technologies: ["ROS", "RTAB-Map", "SolidWorks", "Computer Vision", "Rviz", "C++", "Python", "YAML", "Linux"],
      media: CHIMUELO_MEDIA
    },
    {
      id: "proj-2",
      title: "Social Distancing AI",
      year: "2020",
      repoUrl: "https://github.com/StraigenDaigen/social_distancing_ai",
      academicContext: "specialist",
      description: "Development of a computer vision system to monitor social distancing compliance using security camera footage from Campanario Shopping Mall (Popayán, Colombia) during the COVID-19 pandemic. The solution detects people in a predefined area and measures interpersonal distances to identify violations.\n\nThe system uses OpenCV for video processing and geometric analysis, and a RetinaNet deep learning model for person detection. TensorFlow handles the neural network architecture and GPU-accelerated inference via NVIDIA CUDA, enabling near real-time performance.",
      technologies: ["Python", "OpenCV", "TensorFlow", "CUDA", "RetinaNet", "Tkinter", "Docker"],
      media: SOCIAL_DISTANCING_MEDIA
    },
    {
      id: "proj-2-brent",
      title: "Brent Oil AI Forecaster",
      year: "2020",
      repoUrl: "https://github.com/StraigenDaigen/Oil_Brent_Price_Tracker",
      academicContext: "specialist",
      description: "Development of an AI-powered Android application for tracking and forecasting Brent Crude Oil prices. The system employs time-series forecasting models (ARIMA) converted to TensorFlow Lite to project future prices over a 10-day horizon based on historical data. It features a specialized Sentiment Analysis module utilizing Hugging Face Transformers (BERT) to evaluate financial news and social media signals, determining potential market trends. The robust backend is built with Python and Flask, containerized with Docker, and deployed on Google Cloud Platform (Cloud Run).",
      technologies: ["Kotlin", "Python", "Flask", "TensorFlow", "Hugging Face", "Docker", "GCP", "IEX Cloud"],
      media: BRENT_MEDIA
    },
    {
      id: "proj-1",
      title: "Lidar Object Detection (KITTI)",
      year: "2021",
      repoUrl: "https://github.com/felipetobars/Clustering_Jupyter",
      academicContext: "specialist",
      description: "Developed an object detection system based on Lidar Perception applied to the KITTI dataset. Initial testing utilized Python, JupyterLab, and Open3D, implementing RANSAC preprocessing followed by detection algorithms such as K-means clustering, DBSCAN, and HDBSCAN. Subsequently, the kitti2bag library was integrated to process point clouds within ROS. Final implementation leveraged the PCL library, achieving robust detection using ROI filtering, Ground Plane Fitting, and Euclidean Segmentation.",
      technologies: ["ROS", "Python", "C++", "Open3D", "PCL", "DBSCAN", "RANSAC", "Linux"],
      media: KITTI_MEDIA
    }
  ],
  certifications: CERTIFICATIONS_DATA,
  languages: ["Spanish (Native)", "English (B2 - Conversational/Technical)"]
};

// --- SPANISH DATA ---
const DATA_ES: ResumeData = {
  name: "Luis Felipe Tobar Sotelo",
  title: [
    { label: "Ingeniero de Machine Learning", url: URLS.mlEngineer },
    { label: "Desarrollador Backend Python", url: URLS.pythonBackend },
    { label: "Ingeniero Mecatrónico", url: URLS.mechatronics },
    { label: "Especialista en IA", url: URLS.aiSpecialist },
    { label: "Robótica", url: URLS.robotics },
    { label: "Visión por Computador", url: URLS.computerVision },
    { label: "Deep Learning", url: URLS.deepLearning },
    { label: "CAD", url: URLS.cad }
  ],
  about: `Ingeniero Mecatrónico y Especialista en Inteligencia Artificial con más de 4 años de experiencia en investigación y desarrollo de software basado en Python. En mi rol como Líder Técnico, me enfoco en el ciclo completo de proyectos de Machine Learning y Visión por Computadora, llevándolos desde las primeras pruebas experimentales hasta un estado completamente desplegado y listo para producción.

Mi trabajo se centra en conectar la investigación de deep learning con una ingeniería de software sólida. A lo largo de mi carrera, me he enfocado en:

• Liderar equipos multidisciplinarios, incluyendo desarrolladores de ML, ingenieros backend y frontend, y anotadores, para construir soluciones personalizadas que integren arquitecturas web con modelos avanzados de IA.

• Diseñar sistemas técnicos de alto rendimiento, específicamente APIs REST, microservicios y pipelines de inferencia optimizados para ejecutarse eficientemente incluso en hardware limitado.

• Gestionar el ciclo de vida de los datos de extremo a extremo, lo que incluye todo desde el diseño de esquemas de bases de datos y despliegues contenerizados con Docker hasta el procesamiento de datasets de gran escala y alta dimensionalidad.

Mi trayectoria profesional está arraigada en la ingeniería aplicada y metodologías de código abierto. Este camino comenzó como investigador en el grupo de Robótica y Sistemas Autónomos (RAS) en la Universidad Autónoma de Occidente y continuó a través de roles clave en Manglar (CNX SAS) y CITAE. Mi objetivo siempre es transformar tecnología compleja en herramientas prácticas de alta eficiencia que simplifiquen la toma de decisiones y aseguren una transferencia de conocimiento efectiva dentro de los equipos técnicos.`,
  contact: DATA_EN.contact,
  experience: [
    {
      id: "codaltec-lead",
      role: "Líder Técnico y Desarrollador de Machine Learning",
      company: (
        <>
          <LinkPreview href="https://codaltec.com/" className="hover:text-primary hover:underline transition-colors">CODALTEC - Corporación de Alta Tecnología para la Defensa</LinkPreview>
          {' '}
          <LinkPreview
            href="https://poderespacial.fac.mil.co/es/centro-de-investigacion-en-tecnologias-aeroespaciales"
            previewImage={PREVIEWS.fac}
            className="hover:text-primary hover:underline transition-colors"
          >
            (CITAE - Centro de Investigación en Tecnologías Aeroespaciales | Fuerza Aérea Colombiana)
          </LinkPreview>
          <span className="text-slate-400"> - Cali, Colombia (Remoto)</span>
        </>
      ),
      period: "Presente — Nov 2023",
      description: "Liderar un equipo multidisciplinario de desarrollo de software (**ML**, **Backend**, **Frontend** y Anotadores) en el diseño, prueba y despliegue de soluciones avanzadas de **visión por computador** para partes interesadas internas. El rol se centra en la integración de modelos de **deep learning** en entornos de producción a través de arquitecturas web robustas y **APIs REST**, optimizadas específicamente para el análisis de datos geoespaciales y satelitales a gran escala. Las responsabilidades clave incluyen supervisar la infraestructura de hardware, gestionar el ciclo de vida de desarrollo con **Docker Compose** y **MongoDB**, y asegurar una ejecución de alta eficiencia en hardware con recursos limitados.",
      details: `**Etapa 1: Consultoría Especializada | Optimización de Análisis Raster**
(Noviembre 2023 – Enero 2024)

**Funciones**
• Diseñé y optimicé pipelines de teselado y preprocesamiento para imágenes satelitales a gran escala.
• Desarrollé componentes backend en **Python** y construí **APIs REST** para integrar modelos preliminares de IA.
• Supervisé el procesamiento de datos satelitales y tareas de sensores aerotransportados dentro de entornos de software **GIS**.
• Coordiné la validación de calidad para la anotación de imágenes y preparé documentación científica para la arquitectura del sistema.

**Logros**
• **Discontinuidades Geométricas Resueltas:** Desarrollé un algoritmo personalizado con superposición de teselas ajustable y lógica de fusión geométrica, eliminando brechas entre máscaras de detección adyacentes en rasters de producción.
• **Estandarización del Pipeline:** Corregí exitosamente las brechas de segmentación, asegurando la generación continua y confiable de polígonos para datasets geoespaciales masivos.

**Etapa 2: Expansión de Alcance | Minería, Deforestación y Rendimiento**
(Febrero 2024 – Octubre 2024)

**Funciones**
• Lideré un equipo multifuncional para expandir las capacidades del software desde la detección de Minería hacia el análisis regional de **Deforestación** en la región amazónica.
• Evalué y realicé benchmarking de arquitecturas modernas de detección/segmentación usando **PyTorch**, rastreando experimentos y versiones de modelos con **MLflow**.
• Realicé ingeniería de funciones de alta eficiencia optimizadas para ejecución en el borde (edge) y hardware con recursos limitados.
• Gestioné la integración de datos multi-sensor (SkySat, GeoEye, PlanetScope, WorldView 2/3, ADS80/100).

**Logros**
• **Optimización de Rendimiento:** Logré un **aumento de 2.7x** en el rendimiento de inferencia implementando un pipeline de predicción **multiprocesamiento Productor-Consumidor**.
• **Innovación Técnica:** Implementé la conversión en tiempo real de **16-bit a 8-bit**, eliminando el preprocesamiento manual y habilitando el procesamiento directo de **GeoTIFFs**.
• **Evolución de Modelos:** Creé modelos especializados y ligeros por tipo de sensor utilizando arquitecturas como **[YOLOv7-v11](https://docs.ultralytics.com/#yolo-a-brief-history)**, **[RT-DETR](https://docs.ultralytics.com/models/rtdetr/)**, **[SegFormer](https://huggingface.co/docs/transformers/model_doc/segformer)** y **[U-Net](https://github.com/sevakon/unet-keras)**.
• **Impacto Ambiental:** Desarrollé módulos de análisis temporal para rastrear la pérdida y recuperación de bosque a lo largo del tiempo.

**Etapa 3: Metodologías Híbridas y Automatización Operacional**
(Noviembre 2024 – Presente)

**Funciones**
• Diseñando una metodología de red neuronal híbrida para identificar gran infraestructura lineal (caminos) que abarca múltiples teselas.
• Ingeniería de endpoints backend en **Python** y gestión de arquitectura de base de datos **MongoDB** para estructuras de datos complejas.
• Supervisando despliegues contenerizados usando **Docker Compose** y coordinando la integración fluida con los equipos de Frontend y DevOps.
• Gestionando el ciclo de vida de desarrollo de extremo a extremo para nuevas características del sistema y módulos de contexto semántico.

**Logros**
• **Solución de Pérdida de Contexto:** Co-desarrollé una metodología híbrida combinando **[YOLOv11](https://docs.ultralytics.com/models/yolo11/)** (Detección de ROI) y **[SegFormer](https://huggingface.co/docs/transformers/model_doc/segformer)** (Segmentación Semántica consciente del contexto), resolviendo exitosamente la pérdida de contexto en objetos que abarcan múltiples teselas.
• **Automatización de Flujo de Trabajo:** Diseñé un sistema de reporte automatizado (generación backend de **PPTX**), reduciendo la carga de trabajo del analista de **días/semanas** a solo **minutos/horas**.
• **Arquitectura del Sistema:** Estandaricé entregables y flujos de trabajo operativos, aumentando significativamente la capacidad analítica del departamento.`,
      media: CODALTEC_LEAD_MEDIA,
      technologies: ["Python", "YOLOv11", "SegFormer", "MongoDB", "Flask", "Docker", "PyTorch", "RT-DETR"],
      references: [
        { name: "Paola Andrea Zárate Luna", role: "Directora de Proyectos de IA CITAE (2023-2024)", phone: "+573184383930", email: "paola.zarate@fac.mil.co" },
        { name: "Alejandro Carvajal González", role: "Investigador principal de proyectos Geomask y Pistas en CITAE (2023-2025)", phone: "+573153404327" }
      ]
    },
    {
      id: "manglar",
      role: "Desarrollador de Machine Learning",
      company: (
        <>
          <LinkPreview href="https://www.manglar.com/" className="hover:text-primary hover:underline transition-colors">CNX S.A.S. - MANGLAR</LinkPreview>
          <span className="text-slate-400"> - Cali, Colombia (Remoto)</span>
        </>
      ),
      period: "Jul 2023 — Ago 2022",
      description: "Desarrollador de Machine Learning responsable del ciclo de vida completo de soluciones de **Deep Learning** para agricultura de precisión, cubriendo ingeniería de datos, estrategia de anotación, desarrollo de modelos, optimización y soporte para despliegue en producción. Trabajé con **Python** y **TensorFlow** para diseñar pipelines escalables para imágenes de drones a gran escala, supervisé procesos de calidad de datos, redacté documentación técnica exhaustiva y colaboré con equipos de backend, infraestructura y DevOps para operacionalizar modelos entrenados.",
      details: `**Funciones**
• Definir, entrenar y optimizar modelos de redes neuronales para **segmentación semántica** y **detección de objetos** utilizando **Python** y **TensorFlow**, asegurando alto rendimiento mediante pruebas y depuración sistemáticas.
• Diseñar estrategias de adquisición de datos mediante ingeniería de consultas **SQL** en bases de datos **SQL Server** alojadas en infraestructura **Azure** para filtrar y recuperar **imágenes históricas de drones de resolución sub-métrica** (**GeoTIFF RGB**) basadas en criterios de fenología de plantación (edad, cobertura de maleza, fecha de adquisición).
• Desarrollar pipelines de preprocesamiento basados en **Python** para dividir grandes mosaicos de drones en parches de imágenes listos para redes neuronales.
• Definir estrategias de anotación de datos redactando manuales técnicos con reglas de identificación estrictas y supervisando equipos de etiquetado utilizando **VGG Image Annotator**.
• Realizar un aseguramiento de calidad riguroso en las anotaciones, corrigiendo errores de geometría y etiquetas faltantes antes de la consolidación del dataset, incluyendo limpieza de duplicados, divisiones train/val/test y **aumento de datos** (data augmentation).
• Diseñar y personalizar arquitecturas de **Deep Learning** para diferentes casos de uso, incluyendo flujos de trabajo de **segmentación semántica** y **detección de objetos**.
• Co-diseñar pipelines de **multiprocesamiento** siguiendo un patrón **Productor-Consumidor** para paralelizar etapas de mosaico, procesamiento por lotes e inferencia.
• Desarrollar funciones backend en **Python** consumidas por **APIs REST** alojadas en servidores **Azure**.
• Gestionar entornos de entrenamiento de modelos en servidores locales y máquinas virtuales **Azure** vía **SSH**/**FortiClient**.
• Colaborar estrechamente con equipos de backend, infraestructura y DevOps para empaquetar modelos entrenados y apoyar su despliegue en sistemas de producción.
• Producir documentación técnica detallada para componentes de software, arquitecturas de modelos y flujos de trabajo de datos para apoyar la mantenibilidad y transferencia de conocimiento.

**Logros**
• Mejoré la precisión de segmentación de caña de azúcar evolucionando el flujo de trabajo de un enfoque basado en índices de color (TGI) a un modelo de **segmentación semántica** personalizado **[DeepLabV3+](https://keras.io/examples/vision/deeplabv3_plus/)**, reduciendo significativamente falsos positivos causados por maleza sin comprometer la velocidad de procesamiento.
• Reduje el tiempo de predicción en aproximadamente **9×** al actualizar de un flujo de trabajo secuencial **[Mask R-CNN](https://github.com/matterport/Mask_RCNN)** a una solución personalizada basada en **[RetinaNet](https://keras.io/examples/vision/retinanet/)** e implementar un pipeline de **multiprocesamiento** **Productor-Consumidor**.
• Expandí las capacidades del modelo entrenando modelos adicionales **[DeepLabV3+](https://keras.io/examples/vision/deeplabv3_plus/)** para escenarios multiclase, incluyendo cultivos, suelo, residuos, maleza, piedras y cuerpos de agua.
• Aumenté la confiabilidad del dataset y la estabilidad del entrenamiento reduciendo errores de anotación y etiquetas faltantes en **más del 80%** a través de procesos estrictos de QA, eliminación de duplicados y división controlada de datasets con aumentación.
• Apoyé actividades de despliegue en producción entregando módulos de **Python** listos para backend y documentación técnica exhaustiva, acortando ciclos de integración y reduciendo retrabajo durante el lanzamiento del sistema.`,
      media: MANGLAR_MEDIA,
      technologies: ["Python", "TensorFlow", "Keras", "SQL Server", "Azure Servers", "Multiprocessing", "Linux"],
      references: [
        { name: "Jonathan Rincón Morales", role: "Líder Técnico Manglar", linkedin: "https://www.linkedin.com/in/jonathan-rinc%C3%B3n-morales-5716b838" }
      ]
    },
    {
      id: "codaltec-researcher",
      role: "Investigador de Inteligencia Artificial",
      company: (
        <>
          <LinkPreview href="https://codaltec.com/" className="hover:text-primary hover:underline transition-colors">CODALTEC - Corporación de Alta Tecnología para la Defensa</LinkPreview>
          {' '}
          <LinkPreview
            href="https://poderespacial.fac.mil.co/es/centro-de-investigacion-en-tecnologias-aeroespaciales"
            previewImage={PREVIEWS.fac}
            className="hover:text-primary hover:underline transition-colors"
          >
            (CITAE - Centro de Investigación en Tecnologías Aeroespaciales | Fuerza Aérea Colombiana)
          </LinkPreview>
          <span className="text-slate-400"> - Cali, Colombia (Híbrido)</span>
        </>
      ),
      period: "Ago 2022 — Abr 2021",
      description: "Generé, diseñé y probé funcionalidades de visión por computador, entornos de despliegue e infraestructura de hardware para aplicar redes neuronales artificiales a datos geoespaciales y satelitales. Exploré y supervisé el procesamiento de datos satelitales y tareas de sensores aerotransportados utilizando **Python** y herramientas GIS (**QGIS**, **ArcGIS Pro**). Produje documentación científica para respaldar la investigación y dirigí sesiones de transferencia de conocimiento para capacitar al personal del centro de investigación en **Machine Learning** y **Deep Learning**.",
      details: `**Funciones**
• Realizar investigaciones y estudios de viabilidad sobre la aplicación de técnicas de **ML** y **Deep Learning** para detectar patrones de minería de oro a cielo abierto (remoción de tierra, piscinas químicas, maquinaria, dragas), progresando desde líneas base de **clustering de ML** a enfoques basados en **CNN**.
• Evaluar, comparar y realizar benchmarking de arquitecturas de segmentación/instancia (**[Mask R-CNN](https://github.com/matterport/Mask_RCNN)** implementado en **TensorFlow** vs **[YOLACT](https://github.com/dbolya/yolact)** implementado en **PyTorch**), ejecutando **transfer learning**, **fine-tuning** y experimentos controlados para evaluar precisión, escalabilidad y restricciones de despliegue.
• Supervisar la construcción de datasets y flujos de trabajo de anotación: coordinar con anotadores de CITAE/FAC, definir reglas de QA para geometrías y etiquetas de clase, e implementar procedimientos de limpieza de datos (eliminación de duplicados, divisiones train/val/test).
• Diseñar e implementar pipelines deterministas de **aumento de datos** (data augmentation) y preprocesamiento para mejorar la robustez del dataset para entrenamiento e inferencia.
• Desarrollar herramientas de validación para analistas y prototipos de software en **Python** (**PySide2**) para visualización raster/vectorial, autenticación, historial de análisis y exportación **GeoJSON**/**Shapefile** (interoperabilidad **QGIS**/**ArcGIS**).
• Preparar informes científicos y consolidar metodología experimental y resultados para revisión por pares y adopción institucional; impartir capacitación práctica y transferencia de conocimiento al personal operativo.

**Logros**
• Mejoró la precisión de identificación de patrones mineros en **≥13% mAP** después de reorganizar el pipeline experimental y seleccionar **[Mask R-CNN](https://github.com/matterport/Mask_RCNN)** sobre **[YOLACT](https://github.com/dbolya/yolact)** basado en desempeño empírico y consideraciones de despliegue.
• Redujo el tiempo de respuesta del análisis de grandes rasters satelitales y aéreos en **≥80%** mediante la entrega del prototipo de escritorio **PySide2** (visualización, auth, historial, exportación **GeoJSON**/**Shapefile**), permitiendo ciclos de validación y decisión mucho más rápidos para los analistas.
• Disminuyó el esfuerzo de corrección y reetiquetado de datasets en **>50%** al hacer cumplir estándares estrictos de anotación, aplicando QA e introduciendo aumentación controlada, lo que estabilizó las iteraciones de reentrenamiento y redujo los ciclos de reetiquetado.
• Consolidó los resultados de investigación en una publicación revisada por pares y permitió la adopción institucional (**[artículo presentado en IEEE COLCACI 2024](https://drive.google.com/file/d/1lRXvr_HzWHhUEXA-N07-I23jFKiWBqdV/view)**), facilitando la transferencia de tecnología dentro del centro de investigación.`,
      media: CITAE_RESEARCHER_MEDIA,
      technologies: ["Python", "TensorFlow", "PyTorch", "PySide2", "Computer Vision", "QGIS", "ArcGIS Pro"],
      references: [
        { name: "Paola Andrea Zárate Luna", role: "Investigador principal de proyecto Geomask en CITAE (2020-2022)", phone: "+573184383930", email: "paola.zarate@fac.mil.co" }
      ]
    }
  ],
  certifications: CERTIFICATIONS_DATA,
  languages: ["Español (Nativo)", "Inglés (B2 - Conversacional/Técnico)"],
  skills: SKILLS_DATA_ES,
  education: [
    {
      id: "specialist",
      degree: "Especialista en Inteligencia Artificial (Posgrado)",
      degreeUrl: "https://virtual.uao.edu.co/blog/especializacion-en-inteligencia-artificial-plan-de-estudios",
      institution: "Universidad Autónoma de Occidente",
      period: "2020 — 2021",
      details: ["Santiago de Cali, Colombia"],
      documents: [
        { label: "Diploma", url: DOCS.specDiploma },
        { label: "Acta de Grado", url: DOCS.specActa }
      ]
    },
    {
      id: "bachelor",
      degree: "Ingeniero Mecatrónico (Pregrado)",
      degreeUrl: "https://www.uao.edu.co/programa/ingenieria-mecatronica/",
      institution: "Universidad Autónoma de Occidente",
      period: "2015 — 2020",
      details: [
        "Santiago de Cali, Colombia",
        "Beca de Tesis en HEIG-VD, Suiza (Discontinuada en 2020).",
        "Honores Académicos: 2016 y 2019"
      ],
      documents: [
        { label: "Diploma", url: DOCS.bachDiploma },
        { label: "Acta de Grado", url: DOCS.bachActa }
      ]
    }
  ],
  workProjects: [],
  academicProjects: [
    {
      id: "easy-tiffvisor",
      title: "Easy TiffVisor: Visualización Masiva de Imágenes Satelitales",
      year: "2025 (En Des.)",
      academicContext: "applied",
      description: "Aplicación de escritorio de alto rendimiento diseñada para la visualización y análisis instantáneo de imágenes geoespaciales a gran escala (GeoTIFF). Su arquitectura elimina las barreras tradicionales de los GIS implementando renderizado al vuelo (On-the-Fly Rendering), permitiendo explorar archivos de múltiples gigabytes en segundos. Extrae y procesa eficientemente solo los píxeles visibles en tiempo real, soportando manipulación espectral dinámica, ajuste de contraste estadístico para datos de 16 bits y herramientas de medición vectorial, utilizando un frontend en Electron y Leaflet conectado a un backend Python/GDAL vía protocolo XYZ.",
      technologies: ["Electron", "JavaScript", "Python", "Flask", "GDAL", "Rasterio", "NumPy", "Leaflet", "Mercantile"],
      media: EASY_TIFFVISOR_MEDIA,
      links: [
        { url: "https://github.com/felipetobars/easy_tiffvisor/tree/geo_electron", type: "github" }
      ]
    },
    {
      id: "easy-whisper",
      title: "Easy Whisper: Voz a Texto Inteligente",
      year: "2025 (En Des.)",
      academicContext: "applied",
      description: "Aplicación de escritorio diseñada para automatizar la transcripción de audio en tiempo real utilizando el modelo Whisper de OpenAI. Convierte voz a texto con alta precisión y eficiencia, ejecutándose completamente de forma local en la máquina del usuario. La aplicación facilita la captura directa de audio desde cualquier micrófono, cuenta con una interfaz visual con indicadores de intensidad de sonido, proporciona atajos globales para control en segundo plano e incluye funcionalidad de escritura automática para pegar el texto transcrito directamente en la aplicación activa.",
      technologies: ["Python", "OpenAI Whisper", "PySide6", "PyTorch", "Sounddevice", "NumPy", "PyAutoGUI", "Conda"],
      media: EASY_WHISPER_MEDIA,
      links: [
        { url: "https://github.com/felipetobars/easy_whisper", type: "github" }
      ]
    },
    {
      id: "proj-5",
      title: "Modelado y Simulación 3D Bugatti",
      year: "2019",
      academicContext: "bachelor",
      description: "Modelado y simulación 3D de un vehículo Bugatti utilizando SolidWorks. El proyecto involucró el Diseño Asistido por Computadora (CAD) detallado de la carrocería exterior y componentes mecánicos del auto basado en planos de referencia. Las actividades clave incluyeron el modelado complejo de superficies del chasis, análisis aerodinámico usando Flow Simulation para evaluar arrastre y flujo de aire, y una simulación dinámica del sistema de suspensión para probar el rendimiento mecánico bajo carga.",
      technologies: ["SolidWorks", "CAD", "Flow Simulation", "Mechanical Design"],
      media: BUGATTI_MEDIA
    },
    {
      id: "proj-4",
      title: "Agrobot (Robot Agrícola)",
      year: "2019",
      academicContext: "bachelor",
      description: "Diseño e implementación de un robot móvil para la caracterización física de arbustos Duranta para ayudar en la identificación de la plaga Nysius Ericae en el vivero de la Universidad Autónoma de Occidente: Se desarrolló un robot terrestre utilizando la metodología de diseño concurrente. Se utilizó el software SolidWorks para el diseño, realizando análisis de estrés con elementos finitos. Para teleoperarlo, se utilizó el middleware ROS, que recibe los comandos del usuario a través de una conexión SSH o Bluetooth. A partir de estos, se publican las velocidades lineales y angulares correspondientes y se transforman a velocidades angulares para cada llanta utilizando la cinemática directa e inversa del robot (tipo diferencial). La etapa de detección de la plaga está en desarrollo pero se han realizado aproximaciones utilizando procesamiento de imágenes con OpenCV.",
      technologies: ["ROS", "SolidWorks", "Python", "OpenCV", "Linux", "C++", "Rviz", "Gazebo", "YAML"],
      media: AGROBOT_MEDIA,
      links: [
        { url: "https://github.com/alejoxbg/Agrobot", type: "github" },
        { url: "https://www.researchgate.net/publication/337988611_AGROBOT-InformeFinaldocx", type: "researchgate" }
      ]
    },
    {
      id: "proj-3",
      title: "Robot Guía",
      year: "2020",
      repoUrl: "https://www.researchgate.net/publication/347270395_REDESIGN_OF_CHIMUELO_LAND_EXPLORATION_VEHICLE_FOR_GUIDANCE_WORK_IN_THE_LABORATORIES_OF_BASEMENTS_2_OF_THE_UNIVERSIDAD_AUTONOMA_DE_OCCIDENTE",
      academicContext: "bachelor",
      description: "A partir de un robot en desuso del semillero de investigación en robótica de la universidad, se propuso un sistema de percepción robótica para dotar de visión computacional al robot. Para esto, se utilizó una cámara de profundidad para obtener una nube de puntos que es procesada por la librería RTAB-Map para ROS y visualizada en Rviz. El robot es capaz de realizar un mapa 3D del entorno de trabajo y luego ubicarse en él, extrayendo características de la nube de puntos y utilizando un filtro de partículas. Las técnicas desarrolladas en este proyecto son generales, por lo que pueden implementarse en otros robots o sistemas. Todos los renders se realizaron utilizando SolidWorks.",
      technologies: ["ROS", "RTAB-Map", "SolidWorks", "Computer Vision", "Rviz", "C++", "Python", "YAML", "Linux"],
      media: CHIMUELO_MEDIA
    },
    {
      id: "proj-2",
      title: "IA de Distanciamiento Social",
      year: "2020",
      repoUrl: "https://github.com/StraigenDaigen/social_distancing_ai",
      academicContext: "specialist",
      description: "Desarrollo de un sistema de visión por computador para monitorear el cumplimiento del distanciamiento social utilizando imágenes de cámaras de seguridad del Centro Comercial Campanario (Popayán, Colombia) durante la pandemia de COVID-19. La solución detecta personas en un área predefinida y mide distancias interpersonales para identificar violaciones.\n\nEl sistema utiliza OpenCV para el procesamiento de video y análisis geométrico, y un modelo de aprendizaje profundo RetinaNet para la detección de personas. TensorFlow maneja la arquitectura de la red neuronal e inferencia acelerada por GPU vía NVIDIA CUDA, permitiendo un rendimiento casi en tiempo real.",
      technologies: ["Python", "OpenCV", "TensorFlow", "CUDA", "RetinaNet", "Tkinter", "Docker"],
      media: SOCIAL_DISTANCING_MEDIA
    },
    {
      id: "proj-2-brent",
      title: "Predicción de Precios Brent con IA",
      year: "2020",
      repoUrl: "https://github.com/StraigenDaigen/Oil_Brent_Price_Tracker",
      academicContext: "specialist",
      description: "Desarrollo de una aplicación Android impulsada por IA para el seguimiento y predicción de precios del petróleo crudo Brent. El sistema emplea modelos de pronóstico de series temporales (ARIMA) convertidos a TensorFlow Lite para proyectar precios futuros en un horizonte de 10 días basado en datos históricos. Cuenta con un módulo especializado de Análisis de Sentimiento utilizando Hugging Face Transformers (BERT) para evaluar noticias financieras y señales de redes sociales, determinando tendencias potenciales del mercado. El backend robusto está construido con Python y Flask, contenerizado con Docker y desplegado en Google Cloud Platform (Cloud Run).",
      technologies: ["Kotlin", "Python", "Flask", "TensorFlow", "Hugging Face", "Docker", "GCP", "IEX Cloud"],
      media: BRENT_MEDIA
    },
    {
      id: "proj-1",
      title: "Detección de Objetos Lidar (KITTI)",
      year: "2021",
      repoUrl: "https://github.com/felipetobars/Clustering_Jupyter",
      academicContext: "specialist",
      description: "Desarrollé un sistema de detección de objetos basado en Percepción Lidar aplicado al dataset KITTI. Las pruebas iniciales utilizaron Python, JupyterLab y Open3D, implementando preprocesamiento RANSAC seguido de algoritmos de detección como K-means clustering, DBSCAN y HDBSCAN. Posteriormente, se integró la librería kitti2bag para procesar nubes de puntos dentro de ROS. La implementación final aprovechó la librería PCL, logrando una detección robusta utilizando filtrado de ROI, ajuste de plano de suelo (Ground Plane Fitting) y segmentación euclidiana.",
      technologies: ["ROS", "Python", "C++", "Open3D", "PCL", "DBSCAN", "RANSAC", "Linux"],
      media: KITTI_MEDIA
    }
  ]
};

export const RESUME_DATA = {
  en: DATA_EN,
  es: DATA_ES
};

export const NAVIGATION_LINKS = {
  en: [
    { name: 'Profile', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills & Technologies', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
  ],
  es: [
    { name: 'Perfil', href: '#about' },
    { name: 'Experiencia', href: '#experience' },
    { name: 'Habilidades y Tecnologías', href: '#skills' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Educación', href: '#education' },
  ]
};

export const ICONS = {
  MapPin: <MapPin className="w-4 h-4" />,
  Mail: <Mail className="w-4 h-4" />,
  Phone: <Phone className="w-4 h-4" />,
  Linkedin: <Linkedin className="w-5 h-5" />,
  Github: <Github className="w-5 h-5" />,
  // Custom Icons for Academic Profiles
  Orcid: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947c-.527 0-.947-.431-.947-.947s.42-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.129 0 4.491-2.167 4.491-4.025 0-1.984-1.2-3.419-3.818-3.419H11.65z" />
    </svg>
  ),
  ResearchGate: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <text x="0.5" y="20" fontFamily="Times New Roman, serif" fontSize="22" fontWeight="bold" style={{ userSelect: 'none' }}>R</text>
      <text x="14" y="9" fontFamily="Times New Roman, serif" fontSize="12" fontWeight="bold" style={{ userSelect: 'none' }}>G</text>
    </svg>
  ),
  Whatsapp: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.188 8.188 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23m4.58 10.4c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18s-.27-.16-.51-.28" />
    </svg>
  )
};