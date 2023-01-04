import hull from "./hull.js";

class MagicLandmarks {
  constructor() {
    this.high_prio_forehead = [10, 67, 69, 104, 108, 109, 151, 299, 337, 338];
    this.high_prio_nose = [
      3, 4, 5, 6, 45, 51, 115, 122, 131, 134, 142, 174, 195, 196, 197, 198, 209,
      217, 220, 236, 248, 275, 277, 281, 360, 363, 399, 419, 420, 429, 437, 440,
      456,
    ];
    this.high_prio_left_cheek = [
      36, 47, 50, 100, 101, 116, 117, 118, 119, 123, 126, 147, 187, 203, 205,
      206, 207, 216,
    ];
    this.high_prio_right_cheek = [
      266, 280, 329, 330, 346, 347, 347, 348, 355, 371, 411, 423, 425, 426, 427,
      436,
    ];
    this.mid_prio_forehead = [
      8, 9, 21, 68, 103, 251, 284, 297, 298, 301, 332, 333, 372, 383,
    ];
    this.mid_prio_nose = [
      1, 44, 49, 114, 120, 121, 128, 168, 188, 351, 358, 412,
    ];
    this.mid_prio_left_cheek = [34, 111, 137, 156, 177, 192, 213, 227, 234];
    this.mid_prio_right_cheek = [340, 345, 352, 361, 454];
    this.mid_prio_chin = [
      135, 138, 169, 170, 199, 208, 210, 211, 214, 262, 288, 416, 428, 430, 431,
      432, 433, 434,
    ];
    this.mid_prio_mouth = [92, 164, 165, 167, 186, 212, 322, 391, 393, 410];
    // more specific areas
    this.forehead_left = [
      21, 71, 68, 54, 103, 104, 63, 70, 53, 52, 65, 107, 66, 108, 69, 67, 109,
      105,
    ];
    this.forehead_center = [10, 151, 9, 8, 107, 336, 285, 55, 8];
    this.forehoead_right = [
      338, 337, 336, 296, 285, 295, 282, 334, 293, 301, 251, 298, 333, 299, 297,
      332, 284,
    ];
    this.eye_right = [
      283, 300, 368, 353, 264, 372, 454, 340, 448, 450, 452, 464, 417, 441, 444,
      282, 276, 446, 368,
    ];
    this.eye_left = [
      127, 234, 34, 139, 70, 53, 124, 35, 111, 228, 230, 121, 244, 189, 222,
      143,
    ];
    this.nose = [
      193, 417, 168, 188, 6, 412, 197, 174, 399, 456, 195, 236, 131, 51, 281,
      360, 440, 4, 220, 219, 305,
    ];
    this.mounth_up = [186, 92, 167, 393, 322, 410, 287, 39, 269, 61, 164];
    this.mounth_down = [43, 106, 83, 18, 406, 335, 273, 424, 313, 194, 204];
    this.chin = [
      204, 170, 140, 194, 201, 171, 175, 200, 418, 396, 369, 421, 431, 379, 424,
    ];
    this.cheek_left_bottom = [215, 138, 135, 210, 212, 57, 216, 207, 192];
    this.cheek_right_bottom = [
      435, 427, 416, 364, 394, 422, 287, 410, 434, 436,
    ];
    this.cheek_left_top = [
      116, 111, 117, 118, 119, 100, 47, 126, 101, 123, 137, 177, 50, 36, 209,
      129, 205, 147, 177, 215, 187, 207, 206, 203,
    ];
    this.cheek_right_top = [
      349, 348, 347, 346, 345, 447, 323, 280, 352, 330, 371, 358, 423, 426, 425,
      427, 411, 376,
    ];
    // dense zones used for convex hull masks
    this.left_eye = [
      157, 144, 145, 22, 23, 25, 154, 31, 160, 33, 46, 52, 53, 55, 56, 189, 190,
      63, 65, 66, 70, 221, 222, 223, 225, 226, 228, 229, 230, 231, 232, 105,
      233, 107, 243, 124,
    ];
    this.right_eye = [
      384, 385, 386, 259, 388, 261, 265, 398, 276, 282, 283, 285, 413, 293, 296,
      300, 441, 442, 445, 446, 449, 451, 334, 463, 336, 464, 467, 339, 341, 342,
      353, 381, 373, 249, 253, 255,
    ];
    this.mounth = [
      391, 393, 11, 269, 270, 271, 287, 164, 165, 37, 167, 40, 43, 181, 313,
      314, 186, 57, 315, 61, 321, 73, 76, 335, 83, 85, 90, 106,
    ];
    // equispaced facial points - mouth and eyes are excluded.
    this.equispaced_facial_points = [
      2, 3, 4, 5, 6, 8, 9, 10, 18, 21, 32, 35, 36, 43, 46, 47, 48, 50, 54, 58,
      67, 68, 69, 71, 92, 93, 101, 103, 104, 108, 109, 116, 117, 118, 123, 132,
      134, 135, 138, 139, 142, 148, 149, 150, 151, 152, 182, 187, 188, 193, 197,
      201, 205, 206, 207, 210, 211, 212, 216, 234, 248, 251, 262, 265, 266, 273,
      277, 278, 280, 284, 288, 297, 299, 322, 323, 330, 332, 333, 337, 338, 345,
      346, 361, 363, 364, 367, 368, 371, 377, 379, 411, 412, 417, 421, 425, 426,
      427, 430, 432, 436,
    ];
  }
}

// let testArr = [
//   [false, false, false, false],
//   [false, true, true, false],
//   [false, true, true, false],
// ];

// let testArr = [
//   [0, 0, 2, 1],
//   [2, 0, 1, 0],
//   [0, 0, 0, 0],
// ];
// console.log(any(testArr, 0));
// let nTest = nonzero(testArr)[0];
// console.log(nTest);

function bbox2_CPU(img) {
  let rows = any(img, 1);
  let cols = any(img, 0);
  let nzrows = nonzero(rows);
  let nzcols = nonzero(cols);

  if (nzrows[0].length == 0 || nzcols[0].length == 0) {
    return [-1, -1, -1, -1];
  }

  let nonrow = nonzero(rows)[0];
  let noncol = nonzero(cols)[0];

  let rmin = nonrow[0];
  let rmax = nonrow[nonrow.length - 1];
  let cmin = noncol[0];
  let cmax = noncol[noncol.length - 1];

  return [rmin, rmax, cmin, cmax];
}

let land = [
  2, 3, 4, 5, 6, 8, 9, 10, 18, 21, 32, 35, 36, 43, 46, 47, 48, 50, 54, 58, 67,
  68, 69, 71, 92, 93, 101, 103, 104, 108, 109, 116, 117, 118, 123, 132, 134,
  135, 138, 139, 142, 148, 149, 150, 151, 152, 182, 187, 188, 193, 197, 201,
  205, 206, 207, 210, 211, 212, 216, 234, 248, 251, 262, 265, 266, 273, 277,
  278, 280, 284, 288, 297, 299, 322, 323, 330, 332, 333, 337, 338, 345, 346,
  361, 363, 364, 367, 368, 371, 377, 379, 411, 412, 417, 421, 425, 426, 427,
  430, 432, 436,
];

// This function performs skin extraction on CPU using a Convex Hull segmentation obtained from facial landmarks.
function extract_skin(image, ldmks) {
  let magicLandmarks = new MagicLandmarks();
  //         let aviable_ldmks = ldmks[ldmks[:,0] >= 0][:,:2]
  let aviable_ldmks = [];
  let ldmks_arr = nj.array([ldmks]);
  if (ldmks_arr.length >= 0) {
    for (let unit of ldmks_arr) {
      aviable_ldmks.push([unit[0], unit[1]]);
    }
  }

  // *face_mask convex hull
  let hulls = convexHull(aviable_ldmks);
  //         let verts = [(aviable_ldmks[v,0], aviable_ldmks[v,1]) for v in hull.vertices]
  //         // img = Image.new('L', image.shape[:2], 0)
  //         // ImageDraw.Draw(img).polygon(verts, outline=1, fill=1)
  //         img = Image.new('L', image.shape[:2], 0)
  //         ImageDraw.Draw(img).polygon(verts, outline=1, fill=1)
  let mask = nj.array([img]);
  //         mask = np.expand_dims(mask,axis=0).T

  // *left eye convex hull
  let left_eye_ldmks = ldmks[magicLandmarks.left_eye];
  //         let aviable_ldmks = left_eye_ldmks[left_eye_ldmks[:,0] >= 0][:,:2]
  ldmks_arr = nj.array(left_eye_ldmks);
  if (ldmks_arr.length >= 0) {
    for (let unit of ldmks_arr) {
      aviable_ldmks.push([unit[0], unit[1]]);
    }
  }
  if (aviable_ldmks.length > 3) {
    hulls = convexHull(aviable_ldmks);
    //             verts = [(aviable_ldmks[v,0], aviable_ldmks[v,1]) for v in hull.vertices]
    //             // img = Image.new('L', image.shape[:2], 0)
    //             // ImageDraw.Draw(img).polygon(verts, outline=1, fill=1)
    //             img = Image.new('L', image.shape[:2], 0)
    //             ImageDraw.Draw(img).polygon(verts, outline=1, fill=1)
    let left_eye_mask = nj.array([img]);
    //             left_eye_mask = np.expand_dims(left_eye_mask,axis=0).T
  } else {
    //             let left_eye_mask = np.ones((image.shape[0], image.shape[1],1),dtype=np.uint8)
  }

  // *right eye convex hull
  let right_eye_ldmks = ldmks[magicLandmarks.right_eye];
  //         aviable_ldmks = right_eye_ldmks[right_eye_ldmks[:,0] >= 0][:,:2]
  ldmks_arr = nj.array(right_eye_ldmks);
  if (ldmks_arr.length >= 0) {
    for (let unit of ldmks_arr) {
      aviable_ldmks.push([unit[0], unit[1]]);
    }
  }
  if (aviable_ldmks.length > 3) {
    hulls = convexHull(aviable_ldmks);
    //             verts = [(aviable_ldmks[v,0], aviable_ldmks[v,1]) for v in hull.vertices]
    //             // img = Image.new('L', image.shape[:2], 0)
    //             // ImageDraw.Draw(img).polygon(verts, outline=1, fill=1)
    //             img = Image.new('L', image.shape[:2], 0)
    //             ImageDraw.Draw(img).polygon(verts, outline=1, fill=1)
    let right_eye_mask = nj.array([img]);
    //             right_eye_mask = np.expand_dims(right_eye_mask,axis=0).T
  } else {
    //             let right_eye_mask = np.ones((image.shape[0], image.shape[1],1),dtype=np.uint8)
  }

  // *mounth convex hull
  let mounth_ldmks = ldmks[magicLandmarks.mounth];
  //         aviable_ldmks = mounth_ldmks[mounth_ldmks[:,0] >= 0][:,:2]
  ldmks_arr = nj.array(mounth_ldmks);
  if (ldmks_arr.length >= 0) {
    for (let unit of ldmks_arr) {
      aviable_ldmks.push([unit[0], unit[1]]);
    }
  }
  if (aviable_ldmks.length > 3) {
    hulls = convexHull(aviable_ldmks);
    //             verts = [(aviable_ldmks[v,0], aviable_ldmks[v,1]) for v in hull.vertices]
    //             // img = Image.new('L', image.shape[:2], 0)
    //             // ImageDraw.Draw(img).polygon(verts, outline=1, fill=1)
    //             img = Image.new('L', image.shape[:2], 0)
    //             ImageDraw.Draw(img).polygon(verts, outline=1, fill=1)
    let mounth_mask = nj.array([img]);
    //             mounth_mask = np.expand_dims(mounth_mask,axis=0).T
  } else {
    //             let mounth_mask = np.ones((image.shape[0], image.shape[1],1),dtype=np.uint8)
  }

  // *apply masks and crop
  const skin_image =
    image *
    mask *
    (1 - left_eye_mask) *
    (1 - right_eye_mask) *
    (1 - mounth_mask);
  const bbox2_CPU_skin = bbox2_CPU(skin_image);
  let [rmin, rmax, cmin, cmax] = bbox2_CPU_skin;
  let cropped_skin_im = skin_image;
  if (
    rmin >= 0 &&
    rmax >= 0 &&
    cmin >= 0 &&
    cmax >= 0 &&
    rmax - rmin >= 0 &&
    cmax - cmin >= 0
  ) {
    //             cropped_skin_im = skin_image[Number(rmin):Number(rmax), Number(cmin):Number(cmax)]
  }

  return cropped_skin_im;
}

export { extract_skin };

function any(arr, axis) {
  let result = [];
  let check = [];

  if (axis === 1) {
    for (let i = 0; i < arr[0].length; i++) {
      for (let j = 0; j < arr.length; j++) {
        check.push(arr[j][i]);
      }
      if (check.some((ele) => ele === true || ele !== 0)) {
        check = [];
        result.push(true);
      } else {
        check = [];
        result.push(false);
      }
    }
    return result;
  } else if (axis === 0) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        check.push(arr[i][j]);
      }
      if (check.some((ele) => ele === true || ele !== 0)) {
        check = [];
        result.push(true);
      } else {
        check = [];
        result.push(false);
      }
    }
    return result;
  }
}

function nonzero(arr) {
  let resultX = [];
  let resultY = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] !== 0) {
        resultX.push(i);
        resultY.push(j);
      }
    }
  }
  return [resultX, resultY];
}
