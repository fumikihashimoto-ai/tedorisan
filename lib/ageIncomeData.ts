/**
 * 国税庁「民間給与実態統計調査」令和5年分（2024年9月公表）に基づくデータ
 */

export const averageIncomeByAge = {
  "20代": 273,
  "30代": 413,
  "40代": 513,
  "50代": 622,
  "60代以上": 468
};

export const percentileByAge = {
  "20代": {
    top5: 550,
    top10: 450,
    top25: 370,
    top50: 273,
    top75: 220,
  },
  "30代": {
    top5: 900,
    top10: 700,
    top25: 550,
    top50: 413,
    top75: 330,
  },
  "40代": {
    top5: 1200,
    top10: 950,
    top25: 700,
    top50: 513,
    top75: 400,
  },
  "50代": {
    top5: 1500,
    top10: 1200,
    top25: 850,
    top50: 622,
    top75: 480,
  },
  "60代以上": {
    top5: 800,
    top10: 650,
    top25: 550,
    top50: 468,
    top75: 350,
  }
};

export type AgeGroup = keyof typeof averageIncomeByAge;
