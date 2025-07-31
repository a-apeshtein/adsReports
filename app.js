// AngularJS Application
var app = angular.module('adsReportsApp', []);

app.controller('MainController', function ($scope, $http, $timeout) {
    // Application State
    $scope.isLoggedIn = false;
    $scope.loading = false;
    $scope.credentials = {
        userName: '',
        password: ''
    };

    // Data Storage
    $scope.leads = [];
    $scope.actions = [];
    $scope.ad = null;
    $scope.filteredLeads = [];
    $scope.filteredActions = [];

    // Filters
    $scope.filters = {
        store: '',
        branch: '',
        computer: '',
        actionType: '',
        startDate: '',
        endDate: ''
    };
    
    // Station filters
    $scope.stationFilters = {
        store: '',
        startDate: '',
        endDate: ''
    };

    $scope.showDeletedLeads = false;
    window.storesDatabase = [
        {
          "storeId": 422,
          "storeName": "Kiosk-MB",
          "branches": [
            {
              "branchId": 645,
              "branchName": "Kiosk-MB"
            }
          ]
        },
        {
          "storeId": 418,
          "storeName": "ראו שלום",
          "branches": [
            {
              "branchId": 636,
              "branchName": "ראו שלום"
            }
          ]
        },
        {
          "storeId": 407,
          "storeName": "Safe Click",
          "branches": [
            {
              "branchId": 617,
              "branchName": "Passaic"
            },
            {
              "branchId": 607,
              "branchName": "Safe Click"
            }
          ]
        },
        {
          "storeId": 135,
          "storeName": "אופיס",
          "branches": [
            {
              "branchId": 220,
              "branchName": "אופיס שמאי 4"
            },
            {
              "branchId": 56,
              "branchName": "אופיס התנאים 2"
            },
            {
              "branchId": 53,
              "branchName": "אופיס ריינט חטיבת הנגב 33 -41"
            },
            {
              "branchId": 439,
              "branchName": "התנאים 2 גברים"
            },
            {
              "branchId": 57,
              "branchName": "ריינט V.I.P"
            },
            {
              "branchId": 55,
              "branchName": "אופיס ריינט האדמו\"ר מבעלזא 4-6"
            },
            {
              "branchId": 185,
              "branchName": "אופיס אברהם שפירא 16"
            },
            {
              "branchId": 54,
              "branchName": "אופיס חטיבת הנגב 31 ב'"
            }
          ]
        },
        {
          "storeId": 414,
          "storeName": "קונקט",
          "branches": [
            {
              "branchId": 625,
              "branchName": "קונקט"
            }
          ]
        },
        {
          "storeId": 208,
          "storeName": "גודנט",
          "branches": [
            {
              "branchId": 252,
              "branchName": "גודנט"
            }
          ]
        },
        {
          "storeId": 411,
          "storeName": "Office Space",
          "branches": [
            {
              "branchId": 611,
              "branchName": "Office Space"
            }
          ]
        },
        {
          "storeId": 419,
          "storeName": "טיהרנט",
          "branches": [
            {
              "branchId": 641,
              "branchName": "טבור הארץ"
            }
          ]
        },
        {
          "storeId": 402,
          "storeName": "בית כנסת חניכי הישיבות רמות ד",
          "branches": [
            {
              "branchId": 604,
              "branchName": "בית כנסת חניכי הישיבות רמות ד"
            }
          ]
        },
        {
          "storeId": 423,
          "storeName": "Local",
          "branches": [
            {
              "branchId": 646,
              "branchName": "Local"
            }
          ]
        },
        {
          "storeId": 424,
          "storeName": "חדר מחשבים",
          "branches": [
            {
              "branchId": 647,
              "branchName": "חדר מחשבים"
            }
          ]
        },
        {
          "storeId": 360,
          "storeName": "פיסיאקס מחשבים",
          "branches": [
            {
              "branchId": 506,
              "branchName": "פיסיאקס מחשבים"
            }
          ]
        },
        {
          "storeId": 78,
          "storeName": "מחשבת - בב",
          "branches": [
            {
              "branchId": 118,
              "branchName": "מחשבת -ראשי"
            },
            {
              "branchId": 586,
              "branchName": "בן זכאי - נשים"
            },
            {
              "branchId": 587,
              "branchName": "מתתיהו - נשים"
            },
            {
              "branchId": 448,
              "branchName": "בן זכאי גברים"
            }
          ]
        },
        {
          "storeId": 330,
          "storeName": "max kosher",
          "branches": [
            {
              "branchId": 457,
              "branchName": "Moozes"
            }
          ]
        },
        {
          "storeId": 263,
          "storeName": "מגנט בית שמש",
          "branches": [
            {
              "branchId": 340,
              "branchName": "מגנט האמוראים"
            }
          ]
        },
        {
          "storeId": 28,
          "storeName": "גל שירותי מחשב",
          "branches": [
            {
              "branchId": 15,
              "branchName": "גל שירותי מחשב"
            },
            {
              "branchId": 482,
              "branchName": "אוצר החכמה"
            },
            {
              "branchId": 190,
              "branchName": "שו שירותי משרד סניף 2"
            },
            {
              "branchId": 588,
              "branchName": "יצחק גולדקלאנג - שירותי משרד"
            }
          ]
        },
        {
          "storeId": 420,
          "storeName": "מחשבת",
          "branches": [
            {
              "branchId": 642,
              "branchName": "אחיסמך"
            }
          ]
        },
        {
          "storeId": 417,
          "storeName": "ויריקורד",
          "branches": [
            {
              "branchId": 631,
              "branchName": "ויריקורד"
            }
          ]
        },
        {
          "storeId": 117,
          "storeName": "משרד ציבורי",
          "branches": [
            {
              "branchId": 40,
              "branchName": "משרד ציבורי"
            }
          ]
        },
        {
          "storeId": 75,
          "storeName": "טהורנט",
          "branches": [
            {
              "branchId": 367,
              "branchName": "טהור נט רשי נשים"
            },
            {
              "branchId": 309,
              "branchName": "סוקולוב פינת זבוטינסקי"
            },
            {
              "branchId": 48,
              "branchName": "clinet"
            },
            {
              "branchId": 307,
              "branchName": "רבי עקיבא 66"
            },
            {
              "branchId": 49,
              "branchName": "טהור נט"
            },
            {
              "branchId": 310,
              "branchName": "עזרא 35"
            },
            {
              "branchId": 308,
              "branchName": "סוקולוב פינת רע"
            },
            {
              "branchId": 305,
              "branchName": "רשי 5"
            },
            {
              "branchId": 333,
              "branchName": "הרב שך גברים"
            },
            {
              "branchId": 204,
              "branchName": "טהורנט+"
            },
            {
              "branchId": 306,
              "branchName": "בן יעקב חדש"
            },
            {
              "branchId": 366,
              "branchName": "טהור נט הרב שך נשים"
            },
            {
              "branchId": 365,
              "branchName": "טהור נט זבוטינסקי נשים"
            }
          ]
        },
        {
          "storeId": 405,
          "storeName": "enter ירושלים",
          "branches": [
            {
              "branchId": 605,
              "branchName": "enter ירושלים"
            }
          ]
        },
        {
          "storeId": 415,
          "storeName": "חיים מרדכי מורגנשטרן",
          "branches": [
            {
              "branchId": 626,
              "branchName": "חיים מרדכי מורגנשטרן"
            }
          ]
        },
        {
          "storeId": 413,
          "storeName": "מנחם ציון",
          "branches": [
            {
              "branchId": 621,
              "branchName": "מנחם ציון"
            }
          ]
        },
        {
          "storeId": 264,
          "storeName": "ריק",
          "branches": [
            {
              "branchId": 341,
              "branchName": "ראשי"
            }
          ]
        },
        {
          "storeId": 178,
          "storeName": "אופיס סנטר סנהדריה",
          "branches": [
            {
              "branchId": 619,
              "branchName": "אופיס סנטר - מעגלי הרי\"מ 133"
            },
            {
              "branchId": 211,
              "branchName": "אופיס סנטר מעגלי הרי\"מ 103"
            }
          ]
        },
        {
          "storeId": 352,
          "storeName": "בית כנסת חזון נחום גילה",
          "branches": [
            {
              "branchId": 490,
              "branchName": "בית כנסת חזון נחום גילה"
            }
          ]
        },
        {
          "storeId": 317,
          "storeName": "זכרון מאיר",
          "branches": [
            {
              "branchId": 434,
              "branchName": "זכרון מאיר"
            }
          ]
        },
        {
          "storeId": 88,
          "storeName": "אוקי נט",
          "branches": [
            {
              "branchId": 384,
              "branchName": "אוקי נט - שאול המלך"
            },
            {
              "branchId": 42,
              "branchName": "אוקי נט"
            }
          ]
        },
        {
          "storeId": 7,
          "storeName": "שטרודל - עמדות מחשב",
          "branches": [
            {
              "branchId": 19,
              "branchName": "שטרודל יואל"
            },
            {
              "branchId": 20,
              "branchName": "שטרודל בית ישראל"
            },
            {
              "branchId": 21,
              "branchName": "שטרודל בית ישראל - נשים"
            }
          ]
        },
        {
          "storeId": 99,
          "storeName": "שמח",
          "branches": [
            {
              "branchId": 70,
              "branchName": "שמח הנשיא"
            },
            {
              "branchId": 275,
              "branchName": "כשר נט"
            },
            {
              "branchId": 52,
              "branchName": "שמח"
            }
          ]
        },
        {
          "storeId": 76,
          "storeName": "ריינט ב\"ש",
          "branches": [
            {
              "branchId": 501,
              "branchName": "ריינט בש2"
            },
            {
              "branchId": 116,
              "branchName": "ריינט ב\"ש -ראשי"
            }
          ]
        },
        {
          "storeId": 183,
          "storeName": "מיר",
          "branches": [
            {
              "branchId": 219,
              "branchName": "מיר"
            }
          ]
        },
        {
          "storeId": 96,
          "storeName": "מחשבת בש",
          "branches": [
            {
              "branchId": 84,
              "branchName": "גרוסמן 5"
            },
            {
              "branchId": 83,
              "branchName": "גרוסמן 28"
            },
            {
              "branchId": 393,
              "branchName": "מכונת מזומן גרוסמן 2"
            },
            {
              "branchId": 231,
              "branchName": "26007"
            },
            {
              "branchId": 187,
              "branchName": "גרוסמן 2"
            }
          ]
        },
        {
          "storeId": 409,
          "storeName": "פרינט",
          "branches": [
            {
              "branchId": 609,
              "branchName": "פרינט"
            }
          ]
        },
        {
          "storeId": 148,
          "storeName": "דוט קום",
          "branches": [
            {
              "branchId": 147,
              "branchName": "דוט קום -ראשי"
            }
          ]
        },
        {
          "storeId": 52,
          "storeName": "Access",
          "branches": [
            {
              "branchId": 23,
              "branchName": "Access"
            },
            {
              "branchId": 369,
              "branchName": "Access plus"
            },
            {
              "branchId": 412,
              "branchName": "Offices plus vip"
            }
          ]
        },
        {
          "storeId": 416,
          "storeName": "שלטר",
          "branches": [
            {
              "branchId": 627,
              "branchName": "שלטר"
            }
          ]
        },
        {
          "storeId": 392,
          "storeName": "עמנואל",
          "branches": [
            {
              "branchId": 581,
              "branchName": "עמנואל"
            }
          ]
        },
        {
          "storeId": 391,
          "storeName": "בית כנסת מרומי שדה",
          "branches": [
            {
              "branchId": 579,
              "branchName": "קהילת מרומי שדה"
            }
          ]
        },
        {
          "storeId": 16,
          "storeName": "ריינט",
          "branches": [
            {
              "branchId": 478,
              "branchName": "ריינט נשים"
            },
            {
              "branchId": 46,
              "branchName": "ריינט ים"
            }
          ]
        },
        {
          "storeId": 39,
          "storeName": "אופיס פור יו",
          "branches": [
            {
              "branchId": 103,
              "branchName": "אופיס פור יו -ראשי"
            },
            {
              "branchId": 433,
              "branchName": "אופיס פור יו 2"
            }
          ]
        },
        {
          "storeId": 111,
          "storeName": "משרד - נט",
          "branches": [
            {
              "branchId": 184,
              "branchName": "משרדנט חזון איש"
            },
            {
              "branchId": 171,
              "branchName": "משרדנט -ברכת אברהם"
            },
            {
              "branchId": 391,
              "branchName": "אלמושנינו"
            }
          ]
        },
        {
          "storeId": 421,
          "storeName": "שומר מסך קרית יובל",
          "branches": [
            {
              "branchId": 643,
              "branchName": "שומר מסך קרית יובל"
            }
          ]
        },
        {
          "storeId": 408,
          "storeName": "מרכז קהילתי ברל 5",
          "branches": [
            {
              "branchId": 608,
              "branchName": "מרכז קהילתי ברל 5"
            }
          ]
        },
        {
          "storeId": 188,
          "storeName": "מוגן בקהילה",
          "branches": [
            {
              "branchId": 227,
              "branchName": "מוגן ב"
            }
          ]
        },
        {
          "storeId": 247,
          "storeName": "מחשב תורני",
          "branches": [
            {
              "branchId": 318,
              "branchName": "מחשב תורני"
            }
          ]
        },
        {
          "storeId": 363,
          "storeName": "net-station",
          "branches": [
            {
              "branchId": 510,
              "branchName": "net-station"
            }
          ]
        },
        {
          "storeId": 81,
          "storeName": "קלינט",
          "branches": [
            {
              "branchId": 589,
              "branchName": "רבי יהודה הנשיא 13"
            },
            {
              "branchId": 25,
              "branchName": "קלינט מסילת יוסף"
            },
            {
              "branchId": 302,
              "branchName": "רבי יהודה הנשיא 24"
            },
            {
              "branchId": 593,
              "branchName": "רבי עקיבא"
            },
            {
              "branchId": 423,
              "branchName": "קלינט אור החיים"
            },
            {
              "branchId": 51,
              "branchName": "קלינט חפץ חיים"
            }
          ]
        },
        {
          "storeId": 381,
          "storeName": "מאורות",
          "branches": [
            {
              "branchId": 556,
              "branchName": "מאורות"
            },
            {
              "branchId": 555,
              "branchName": "מאורות"
            }
          ]
        },
        {
          "storeId": 125,
          "storeName": "hcc",
          "branches": [
            {
              "branchId": 152,
              "branchName": "hcc -ראשי"
            },
            {
              "branchId": 419,
              "branchName": "פלטיניום"
            }
          ]
        },
        {
          "storeId": 110,
          "storeName": "פרנסנו בכבוד",
          "branches": [
            {
              "branchId": 135,
              "branchName": "פרנסנו בכבוד"
            },
            {
              "branchId": 480,
              "branchName": "פרנסנו בכבוד - שמחוני"
            },
            {
              "branchId": 479,
              "branchName": "פרנסנו בכבוד - פנקס"
            }
          ]
        },
        {
          "storeId": 200,
          "storeName": "פרינט - FREE-NET",
          "branches": [
            {
              "branchId": 244,
              "branchName": "מחסני סלולר"
            },
            {
              "branchId": 352,
              "branchName": "הרי זהב"
            },
            {
              "branchId": 260,
              "branchName": "מחסני סלולר- נווה אור"
            }
          ]
        },
        {
          "storeId": 412,
          "storeName": "EnterKosher",
          "branches": [
            {
              "branchId": 612,
              "branchName": "EnterKosher"
            }
          ]
        },
        {
          "storeId": 389,
          "storeName": "אולטרנט",
          "branches": [
            {
              "branchId": 600,
              "branchName": "אולטרנט הנשיא"
            },
            {
              "branchId": 577,
              "branchName": "אולטרנט"
            },
            {
              "branchId": 575,
              "branchName": "אולטרנט לוחמי הגטאות"
            }
          ]
        },
        {
          "storeId": 190,
          "storeName": "LOG INN",
          "branches": [
            {
              "branchId": 230,
              "branchName": "Frischman"
            }
          ]
        },
        {
          "storeId": 332,
          "storeName": "מיכאל יוחנן",
          "branches": [
            {
              "branchId": 461,
              "branchName": "מיכאל יוחנן"
            }
          ]
        },
        {
          "storeId": 34,
          "storeName": "TAG Antwerp",
          "branches": [
            {
              "branchId": 117,
              "branchName": "TAG -ראשי"
            }
          ]
        },
        {
          "storeId": 219,
          "storeName": "קומפיוטר בית וגן",
          "branches": [
            {
              "branchId": 272,
              "branchName": "קומפיוטר בית וגן"
            }
          ]
        },
        {
          "storeId": 95,
          "storeName": "ריינט בני ברק",
          "branches": [
            {
              "branchId": 126,
              "branchName": "ריינט בני ברק -ראשי"
            }
          ]
        },
        {
          "storeId": 20,
          "storeName": "המדפיס - בית שמש",
          "branches": [
            {
              "branchId": 11,
              "branchName": "המדפיס"
            }
          ]
        },
        {
          "storeId": 166,
          "storeName": "שטרק",
          "branches": [
            {
              "branchId": 192,
              "branchName": "שטרק"
            }
          ]
        },
        {
          "storeId": 397,
          "storeName": "שומר מסך ביתר",
          "branches": [
            {
              "branchId": 602,
              "branchName": "שומר מסך רחוב המהרי\"ץ 9 ביתר-נשים"
            },
            {
              "branchId": 595,
              "branchName": "שומר מסך רחוב המהרי\"ץ 9 ביתר"
            }
          ]
        },
        {
          "storeId": 3,
          "storeName": "חושב",
          "branches": [
            {
              "branchId": 92,
              "branchName": "נוה יעקב"
            },
            {
              "branchId": 41,
              "branchName": "נוף רמות"
            },
            {
              "branchId": 297,
              "branchName": "קרית יובל"
            },
            {
              "branchId": 4,
              "branchName": "בית וגן"
            },
            {
              "branchId": 82,
              "branchName": "ירמיהו פינת צפניה"
            },
            {
              "branchId": 592,
              "branchName": "מרומי שדה"
            },
            {
              "branchId": 201,
              "branchName": "רחובות"
            },
            {
              "branchId": 378,
              "branchName": "יהודה הנשיא"
            },
            {
              "branchId": 483,
              "branchName": "אבני נזר"
            },
            {
              "branchId": 81,
              "branchName": "גני גאולה"
            },
            {
              "branchId": 3,
              "branchName": "זכרון משה"
            },
            {
              "branchId": 188,
              "branchName": "אבינדב- בר אילן"
            },
            {
              "branchId": 207,
              "branchName": "בית ישראל"
            },
            {
              "branchId": 26,
              "branchName": "יואל"
            },
            {
              "branchId": 276,
              "branchName": "מעלה אדומים"
            },
            {
              "branchId": 64,
              "branchName": "גבעת שאול"
            },
            {
              "branchId": 376,
              "branchName": "מסילת יוסף"
            },
            {
              "branchId": 382,
              "branchName": "נודע ביהודה"
            },
            {
              "branchId": 2,
              "branchName": "עלי הכהן"
            },
            {
              "branchId": 283,
              "branchName": "מלכי ישראל"
            },
            {
              "branchId": 377,
              "branchName": "נתיבות שלום"
            }
          ]
        },
        {
          "storeId": 328,
          "storeName": "פאר הנצח",
          "branches": [
            {
              "branchId": 454,
              "branchName": "פאר הנצח"
            }
          ]
        },
        {
          "storeId": 265,
          "storeName": "בד זהב יזמות ובניה",
          "branches": [
            {
              "branchId": 342,
              "branchName": "בד זהב יזמות ובניה"
            }
          ]
        },
        {
          "storeId": 344,
          "storeName": "קליקאיט(click it)",
          "branches": [
            {
              "branchId": 473,
              "branchName": "קליקאיט(click it)"
            }
          ]
        },
        {
          "storeId": 401,
          "storeName": "תלמוד תורה עטרת שלמה",
          "branches": [
            {
              "branchId": 637,
              "branchName": "טלזסטון"
            },
            {
              "branchId": 616,
              "branchName": "בני ברק מרכז"
            },
            {
              "branchId": 601,
              "branchName": "תלמוד תורה עטרת שלמה בית שמש"
            }
          ]
        },
        {
          "storeId": 222,
          "storeName": "גודנט בב",
          "branches": [
            {
              "branchId": 279,
              "branchName": "גוד-נט"
            }
          ]
        },
        {
          "storeId": 372,
          "storeName": "Click it Kiosk",
          "branches": [
            {
              "branchId": 530,
              "branchName": "Click it Kiosk"
            }
          ]
        },
        {
          "storeId": 70,
          "storeName": "ועד הקהילה חדרה",
          "branches": [
            {
              "branchId": 639,
              "branchName": "ועד הקהילה"
            },
            {
              "branchId": 140,
              "branchName": "ועד הקהילה חדרה -ראשי"
            }
          ]
        },
        {
          "storeId": 22,
          "storeName": "גראפיקס D&S",
          "branches": [
            {
              "branchId": 12,
              "branchName": "גרפיקס"
            }
          ]
        },
        {
          "storeId": 269,
          "storeName": "Kosher Palace",
          "branches": [
            {
              "branchId": 347,
              "branchName": "Kosher Palace"
            }
          ]
        },
        {
          "storeId": 197,
          "storeName": "אופיסנט",
          "branches": [
            {
              "branchId": 240,
              "branchName": "אופיסנט"
            },
            {
              "branchId": 387,
              "branchName": "נשים"
            }
          ]
        },
        {
          "storeId": 155,
          "storeName": "דורותינו",
          "branches": [
            {
              "branchId": 149,
              "branchName": "דורותינו -ראשי"
            }
          ]
        },
        {
          "storeId": 181,
          "storeName": "מגנט מודיעין עילית",
          "branches": [
            {
              "branchId": 360,
              "branchName": "מגנט ריטב\"א"
            },
            {
              "branchId": 215,
              "branchName": "מגנט רשב\"ם"
            }
          ]
        },
        {
          "storeId": 390,
          "storeName": "קלינט1",
          "branches": [
            {
              "branchId": 576,
              "branchName": "קלינט קצות החושן"
            }
          ]
        },
        {
          "storeId": 53,
          "storeName": "VIP",
          "branches": [
            {
              "branchId": 266,
              "branchName": "VIP קב ונקי"
            },
            {
              "branchId": 80,
              "branchName": "עמדות מחשב הטורים"
            },
            {
              "branchId": 50,
              "branchName": "VIP"
            }
          ]
        },
        {
          "storeId": 385,
          "storeName": "קונטרול C",
          "branches": [
            {
              "branchId": 567,
              "branchName": "קונטרול C"
            }
          ]
        },
        {
          "storeId": 295,
          "storeName": "בוטיק מחשבים עמדות בשירות עצמי",
          "branches": [
            {
              "branchId": 400,
              "branchName": "בוטיק מחשבים עמדות בשירות עצמי"
            }
          ]
        },
        {
          "storeId": 318,
          "storeName": "סינונט",
          "branches": [
            {
              "branchId": 436,
              "branchName": "סינונט"
            }
          ]
        },
        {
          "storeId": 313,
          "storeName": "משה נחמן",
          "branches": [
            {
              "branchId": 428,
              "branchName": "משה נחמן"
            }
          ]
        },
        {
          "storeId": 400,
          "storeName": "ביזנעס סנטר",
          "branches": [
            {
              "branchId": 630,
              "branchName": "ןטעע"
            },
            {
              "branchId": 623,
              "branchName": "עמסיחצג"
            },
            {
              "branchId": 628,
              "branchName": "משרד אישי"
            },
            {
              "branchId": 632,
              "branchName": "משרד אישי"
            },
            {
              "branchId": 629,
              "branchName": "משרד אישי"
            },
            {
              "branchId": 599,
              "branchName": "ביזנעס סנטר"
            },
            {
              "branchId": 633,
              "branchName": "Persoonlijk kantoor"
            }
          ]
        },
        {
          "storeId": 307,
          "storeName": "מתן בסתר-קרית ספר",
          "branches": [
            {
              "branchId": 415,
              "branchName": "מתן בסתר-קרית ספר"
            }
          ]
        },
        {
          "storeId": 338,
          "storeName": "עמותת ישמח צדיק",
          "branches": [
            {
              "branchId": 467,
              "branchName": "עמותת ישמח צדיק"
            }
          ]
        },
        {
          "storeId": 66,
          "storeName": "קו נקי",
          "branches": [
            {
              "branchId": 29,
              "branchName": "קו נקי"
            }
          ]
        },
        {
          "storeId": 61,
          "storeName": "גיליגרפיק",
          "branches": [
            {
              "branchId": 13,
              "branchName": "גילי גרפיק"
            }
          ]
        },
        {
          "storeId": 288,
          "storeName": "פילטר111",
          "branches": [
            {
              "branchId": 389,
              "branchName": "פילטר"
            }
          ]
        },
        {
          "storeId": 257,
          "storeName": "תפארת אברהם אלימלך",
          "branches": [
            {
              "branchId": 330,
              "branchName": "תפארת אברהם אלימלך"
            }
          ]
        },
        {
          "storeId": 101,
          "storeName": "גלאט אופיס אשדוד",
          "branches": [
            {
              "branchId": 179,
              "branchName": "גלאט אופיס אשדוד -ראשי"
            }
          ]
        },
        {
          "storeId": 139,
          "storeName": "Oncall",
          "branches": [
            {
              "branchId": 172,
              "branchName": "Oncall -ראשי"
            }
          ]
        },
        {
          "storeId": 369,
          "storeName": "טסט",
          "branches": [
            {
              "branchId": 520,
              "branchName": "טסט"
            }
          ]
        },
        {
          "storeId": 204,
          "storeName": "א היימישע אופיס- מאש",
          "branches": [
            {
              "branchId": 249,
              "branchName": "א היימישע אופיס"
            }
          ]
        },
        {
          "storeId": 51,
          "storeName": "קומפיוטר סרוויס אשדוד",
          "branches": [
            {
              "branchId": 37,
              "branchName": "זמנט ראשי"
            },
            {
              "branchId": 241,
              "branchName": "קומפיוטר סרוויס לווין 33"
            },
            {
              "branchId": 372,
              "branchName": "קומפיוטר סרוויס רשבי 17"
            },
            {
              "branchId": 373,
              "branchName": "קומפיוטר סרוויס רשבי 19"
            },
            {
              "branchId": 38,
              "branchName": "קומפיוטר סרוויס שמאי"
            },
            {
              "branchId": 375,
              "branchName": "קומפיוטר סרוויס עמדות כפולות"
            }
          ]
        },
        {
          "storeId": 137,
          "storeName": "קומפיוטר'ס",
          "branches": [
            {
              "branchId": 624,
              "branchName": "טרפון נשים"
            },
            {
              "branchId": 177,
              "branchName": "קומפיוטר'ס"
            }
          ]
        },
        {
          "storeId": 37,
          "storeName": "נטסנטר",
          "branches": [
            {
              "branchId": 96,
              "branchName": "נטסנטר -ראשי"
            }
          ]
        },
        {
          "storeId": 47,
          "storeName": "גמחשבים",
          "branches": [
            {
              "branchId": 111,
              "branchName": "גמחשבים"
            }
          ]
        },
        {
          "storeId": 124,
          "storeName": "אנטר בב לנדא",
          "branches": [
            {
              "branchId": 162,
              "branchName": "אנטר בב לנדא -ראשי"
            }
          ]
        },
        {
          "storeId": 73,
          "storeName": "קרית גת",
          "branches": [
            {
              "branchId": 123,
              "branchName": "קרית גת -ראשי"
            },
            {
              "branchId": 245,
              "branchName": "קרית גת-חותם"
            }
          ]
        },
        {
          "storeId": 284,
          "storeName": "קהילת הישיבה כרמיאל",
          "branches": [
            {
              "branchId": 383,
              "branchName": "קהילת הישיבה כרמיאל"
            }
          ]
        },
        {
          "storeId": 122,
          "storeName": "אנטר בב",
          "branches": [
            {
              "branchId": 161,
              "branchName": "אנטר בב -ראשי"
            }
          ]
        },
        {
          "storeId": 218,
          "storeName": "עט לכתוב",
          "branches": [
            {
              "branchId": 271,
              "branchName": "עט לכתוב"
            }
          ]
        },
        {
          "storeId": 410,
          "storeName": "TAG Schweiz",
          "branches": [
            {
              "branchId": 610,
              "branchName": "TAG Schweiz"
            }
          ]
        },
        {
          "storeId": 350,
          "storeName": "ישיבת קרית מלאכי",
          "branches": [
            {
              "branchId": 488,
              "branchName": "ישיבת קרית מלאכי"
            }
          ]
        },
        {
          "storeId": 97,
          "storeName": "כשר קליק",
          "branches": [
            {
              "branchId": 128,
              "branchName": "כשר קליק -ראשי"
            }
          ]
        },
        {
          "storeId": 347,
          "storeName": "ספייס ירושלים",
          "branches": [
            {
              "branchId": 484,
              "branchName": "ספייס ים"
            }
          ]
        },
        {
          "storeId": 80,
          "storeName": "כשר קומפיוטר",
          "branches": [
            {
              "branchId": 119,
              "branchName": "כשר קומפיוטר -ראשי"
            }
          ]
        },
        {
          "storeId": 158,
          "storeName": "my office BB",
          "branches": [
            {
              "branchId": 144,
              "branchName": "my office BB -ראשי"
            }
          ]
        },
        {
          "storeId": 406,
          "storeName": "נקי טק",
          "branches": [
            {
              "branchId": 606,
              "branchName": "נקי טק"
            }
          ]
        },
        {
          "storeId": 186,
          "storeName": "היימישנט בש",
          "branches": [
            {
              "branchId": 225,
              "branchName": "היימישנט בש - אביי"
            },
            {
              "branchId": 348,
              "branchName": "האמוראים"
            },
            {
              "branchId": 499,
              "branchName": "רבניא 12 בי\"ש"
            },
            {
              "branchId": 574,
              "branchName": "לב הרמה ביש"
            }
          ]
        },
        {
          "storeId": 44,
          "storeName": "מהדרינט ים",
          "branches": [
            {
              "branchId": 572,
              "branchName": "אלשיך"
            },
            {
              "branchId": 39,
              "branchName": "מהדרינט ים"
            },
            {
              "branchId": 14,
              "branchName": "אווינקל"
            }
          ]
        },
        {
          "storeId": 335,
          "storeName": "פיקסנט",
          "branches": [
            {
              "branchId": 464,
              "branchName": "מעזריטש 28"
            }
          ]
        },
        {
          "storeId": 253,
          "storeName": "עמותת לתת יד",
          "branches": [
            {
              "branchId": 326,
              "branchName": "עמותת לתת יד"
            }
          ]
        },
        {
          "storeId": 239,
          "storeName": "EML",
          "branches": [
            {
              "branchId": 644,
              "branchName": "EML+"
            },
            {
              "branchId": 303,
              "branchName": "EML"
            }
          ]
        },
        {
          "storeId": 339,
          "storeName": "אקווה רום שיקים - לא פעיל",
          "branches": [
            {
              "branchId": 468,
              "branchName": "אקווה רום שיקים"
            }
          ]
        },
        {
          "storeId": 199,
          "storeName": "ספייס אשדוד",
          "branches": [
            {
              "branchId": 243,
              "branchName": "ספייס אשדוד ראשי"
            },
            {
              "branchId": 396,
              "branchName": "נשים"
            }
          ]
        },
        {
          "storeId": 394,
          "storeName": "ClickIt Cubicle",
          "branches": [
            {
              "branchId": 585,
              "branchName": "ClickIt Cubicule"
            }
          ]
        },
        {
          "storeId": 169,
          "storeName": "דיסק און קי",
          "branches": [
            {
              "branchId": 196,
              "branchName": "דיסק און קי"
            },
            {
              "branchId": 291,
              "branchName": "חדר מחשבים VIP"
            },
            {
              "branchId": 292,
              "branchName": "חדר מחשבים חפץ חיים"
            }
          ]
        },
        {
          "storeId": 244,
          "storeName": "המשרד",
          "branches": [
            {
              "branchId": 314,
              "branchName": "המשרד"
            }
          ]
        },
        {
          "storeId": 17,
          "storeName": "גלאט אופיס",
          "branches": [
            {
              "branchId": 122,
              "branchName": "גלאט אופיס -ראשי"
            }
          ]
        },
        {
          "storeId": 198,
          "storeName": "המשרד שלנו",
          "branches": [
            {
              "branchId": 242,
              "branchName": "המשרד שלנו"
            }
          ]
        },
        {
          "storeId": 395,
          "storeName": "המרכז להפצת התורה",
          "branches": [
            {
              "branchId": 590,
              "branchName": "המרכז להפצת התורה"
            }
          ]
        },
        {
          "storeId": 191,
          "storeName": "צימערנט",
          "branches": [
            {
              "branchId": 232,
              "branchName": "צימערנט"
            }
          ]
        },
        {
          "storeId": 4,
          "storeName": "יצליח",
          "branches": [
            {
              "branchId": 104,
              "branchName": "יצליח -ראשי"
            }
          ]
        },
        {
          "storeId": 220,
          "storeName": "ישיבת צפת",
          "branches": [
            {
              "branchId": 274,
              "branchName": "ישיבת צפת"
            }
          ]
        },
        {
          "storeId": 223,
          "storeName": "גמח מחשבים חריש",
          "branches": [
            {
              "branchId": 280,
              "branchName": "גמח מחשבים"
            }
          ]
        },
        {
          "storeId": 115,
          "storeName": "ריסט",
          "branches": [
            {
              "branchId": 163,
              "branchName": "ריסט -ראשי"
            }
          ]
        },
        {
          "storeId": 167,
          "storeName": "פריוונט",
          "branches": [
            {
              "branchId": 543,
              "branchName": "אהבת שלום"
            },
            {
              "branchId": 193,
              "branchName": "חדר מחשבים"
            },
            {
              "branchId": 477,
              "branchName": "ירמיהו"
            }
          ]
        },
        {
          "storeId": 331,
          "storeName": "משה אברהם",
          "branches": [
            {
              "branchId": 458,
              "branchName": "משה אברהם"
            }
          ]
        },
        {
          "storeId": 149,
          "storeName": "סנטר אופיס",
          "branches": [
            {
              "branchId": 522,
              "branchName": "אופיס סנטר פרימיום"
            },
            {
              "branchId": 143,
              "branchName": "אופיס סנטר - אהליאב - ראשי"
            }
          ]
        },
        {
          "storeId": 193,
          "storeName": "נטו מהודר בב",
          "branches": [
            {
              "branchId": 234,
              "branchName": "נטו מהודר בב"
            }
          ]
        },
        {
          "storeId": 210,
          "storeName": "בית חלקיה",
          "branches": [
            {
              "branchId": 254,
              "branchName": "בית חלקיה"
            }
          ]
        },
        {
          "storeId": 8,
          "storeName": "מייפון",
          "branches": [
            {
              "branchId": 102,
              "branchName": "מייפון -ראשי"
            }
          ]
        },
        {
          "storeId": 273,
          "storeName": "טראכט",
          "branches": [
            {
              "branchId": 526,
              "branchName": "בית שמש"
            },
            {
              "branchId": 603,
              "branchName": "נחליאל"
            },
            {
              "branchId": 481,
              "branchName": "נווה יעקב"
            },
            {
              "branchId": 350,
              "branchName": "תל ציון"
            }
          ]
        },
        {
          "storeId": 217,
          "storeName": "קלינט הר יונה",
          "branches": [
            {
              "branchId": 267,
              "branchName": "קלינט הר יונה"
            }
          ]
        },
        {
          "storeId": 54,
          "storeName": "אופיס סנטר",
          "branches": [
            {
              "branchId": 546,
              "branchName": "אופיס סנטר - נשים  "
            },
            {
              "branchId": 142,
              "branchName": "אופיס סנטר ראשי - המ\"ג"
            }
          ]
        },
        {
          "storeId": 21,
          "storeName": "מגן הרמה",
          "branches": []
        },
        {
          "storeId": 77,
          "storeName": "אפיק כשר",
          "branches": [
            {
              "branchId": 112,
              "branchName": "אפיק כשר -ראשי"
            }
          ]
        },
        {
          "storeId": 90,
          "storeName": "יסודות",
          "branches": [
            {
              "branchId": 127,
              "branchName": "יסודות -ראשי"
            }
          ]
        },
        {
          "storeId": 203,
          "storeName": "קומפיוטר",
          "branches": []
        },
        {
          "storeId": 120,
          "storeName": "פוטופלוס",
          "branches": [
            {
              "branchId": 66,
              "branchName": "פוטופלוס"
            },
            {
              "branchId": 67,
              "branchName": "פוטופלוס רמה ג"
            }
          ]
        },
        {
          "storeId": 142,
          "storeName": "סטיישן",
          "branches": [
            {
              "branchId": 176,
              "branchName": "סטיישן -ראשי"
            },
            {
              "branchId": 539,
              "branchName": "סטיישן - יחזקאל"
            },
            {
              "branchId": 281,
              "branchName": "סטיישן - יצהר"
            }
          ]
        },
        {
          "storeId": 261,
          "storeName": "בית כנסת זהר הגליל צפת",
          "branches": [
            {
              "branchId": 335,
              "branchName": "בית כנסת זהר הגליל צפת"
            }
          ]
        },
        {
          "storeId": 41,
          "storeName": "קומפיוטר סרוויס",
          "branches": [
            {
              "branchId": 107,
              "branchName": "קומפיוטר סרוויס -ראשי"
            }
          ]
        },
        {
          "storeId": 45,
          "storeName": "קומפיוטר סרוויס קאליש",
          "branches": []
        },
        {
          "storeId": 268,
          "storeName": "שלמה קרישבסקי",
          "branches": [
            {
              "branchId": 346,
              "branchName": "שלמה קרישבסקי"
            }
          ]
        },
        {
          "storeId": 119,
          "storeName": "פוינטנט",
          "branches": [
            {
              "branchId": 151,
              "branchName": "פוינטנט -ראשי"
            }
          ]
        },
        {
          "storeId": 40,
          "storeName": "קלינט - חדר מחשבים לנשים",
          "branches": [
            {
              "branchId": 199,
              "branchName": "מחשבים בקריה"
            },
            {
              "branchId": 63,
              "branchName": "קלינט"
            }
          ]
        },
        {
          "storeId": 98,
          "storeName": "Orange K Center",
          "branches": [
            {
              "branchId": 137,
              "branchName": "Orange K Center -ראשי"
            }
          ]
        },
        {
          "storeId": 2,
          "storeName": "סטארט",
          "branches": [
            {
              "branchId": 101,
              "branchName": "ביתר -ראשי"
            },
            {
              "branchId": 194,
              "branchName": "סטארט A"
            }
          ]
        },
        {
          "storeId": 33,
          "storeName": "מעלה עמוס",
          "branches": [
            {
              "branchId": 95,
              "branchName": "מעלה עמוס -ראשי"
            }
          ]
        },
        {
          "storeId": 286,
          "storeName": "מחשב פלוס בית שמש",
          "branches": [
            {
              "branchId": 385,
              "branchName": "מחשב פלוס בית שמש"
            }
          ]
        },
        {
          "storeId": 138,
          "storeName": "לינקנט",
          "branches": [
            {
              "branchId": 406,
              "branchName": "מודיעין עילית"
            },
            {
              "branchId": 85,
              "branchName": "פוטומן"
            },
            {
              "branchId": 237,
              "branchName": "לינקנט החוזה 60"
            },
            {
              "branchId": 75,
              "branchName": "לינקנט רבי עקיבא"
            },
            {
              "branchId": 76,
              "branchName": "כשר קליק"
            },
            {
              "branchId": 289,
              "branchName": "הרן 1"
            },
            {
              "branchId": 338,
              "branchName": "הרב שך 64"
            }
          ]
        },
        {
          "storeId": 396,
          "storeName": "פילטר",
          "branches": [
            {
              "branchId": 591,
              "branchName": "פילטר"
            }
          ]
        },
        {
          "storeId": 213,
          "storeName": "דרכא אחרינא",
          "branches": [
            {
              "branchId": 329,
              "branchName": "בית וגן"
            },
            {
              "branchId": 268,
              "branchName": "נווה יעקב"
            },
            {
              "branchId": 258,
              "branchName": "ראשי"
            }
          ]
        },
        {
          "storeId": 107,
          "storeName": "outworqs",
          "branches": [
            {
              "branchId": 618,
              "branchName": "Clifton Women & Couples"
            },
            {
              "branchId": 339,
              "branchName": "Five Towns"
            },
            {
              "branchId": 345,
              "branchName": "Flatbush"
            },
            {
              "branchId": 44,
              "branchName": "Westgate"
            },
            {
              "branchId": 43,
              "branchName": "Clifton Men's Location"
            },
            {
              "branchId": 452,
              "branchName": "Passaic"
            },
            {
              "branchId": 554,
              "branchName": "Jackson"
            },
            {
              "branchId": 456,
              "branchName": "Baltimore"
            }
          ]
        },
        {
          "storeId": 35,
          "storeName": "גלאט מחשבים",
          "branches": [
            {
              "branchId": 121,
              "branchName": "גלאט מחשבים -ראשי"
            }
          ]
        },
        {
          "storeId": 348,
          "storeName": "שערי תפילה-חסדי נחמיה",
          "branches": [
            {
              "branchId": 485,
              "branchName": "שערי תפילה-חסדי נחמיה"
            }
          ]
        },
        {
          "storeId": 157,
          "storeName": "אפריון עמדות מחשב",
          "branches": [
            {
              "branchId": 148,
              "branchName": "אפריון עמדות מחשב -ראשי"
            }
          ]
        },
        {
          "storeId": 388,
          "storeName": "איחוד ברסלב באומן",
          "branches": [
            {
              "branchId": 570,
              "branchName": "איחוד ברסלב באומן"
            },
            {
              "branchId": 578,
              "branchName": "עיר הצדק"
            }
          ]
        },
        {
          "storeId": 109,
          "storeName": "מגנט",
          "branches": [
            {
              "branchId": 22,
              "branchName": "מגנט בב"
            }
          ]
        },
        {
          "storeId": 340,
          "storeName": "אקווה רום שיקים",
          "branches": [
            {
              "branchId": 469,
              "branchName": "אקווה רום שיקים"
            }
          ]
        },
        {
          "storeId": 123,
          "storeName": "World of communications",
          "branches": [
            {
              "branchId": 168,
              "branchName": "World of communications -ראשי"
            }
          ]
        },
        {
          "storeId": 275,
          "storeName": "כשמיר",
          "branches": [
            {
              "branchId": 362,
              "branchName": "דרכא אחרינא בית וגן"
            },
            {
              "branchId": 356,
              "branchName": "כשמיר"
            }
          ]
        },
        {
          "storeId": 304,
          "storeName": "מחוק. פנוי",
          "branches": [
            {
              "branchId": 411,
              "branchName": "גמח מחשבים רמה ה"
            }
          ]
        },
        {
          "storeId": 230,
          "storeName": "אויבער חוכם",
          "branches": [
            {
              "branchId": 290,
              "branchName": "אויבער חוכם"
            }
          ]
        },
        {
          "storeId": 174,
          "storeName": "קונטרול ירוחם",
          "branches": [
            {
              "branchId": 203,
              "branchName": "קונטרול ירוחם"
            }
          ]
        },
        {
          "storeId": 216,
          "storeName": "קרפף",
          "branches": [
            {
              "branchId": 264,
              "branchName": "קרפף"
            }
          ]
        },
        {
          "storeId": 345,
          "storeName": "פוינט",
          "branches": [
            {
              "branchId": 474,
              "branchName": "פוינט"
            },
            {
              "branchId": 487,
              "branchName": "פוינט מכונות תשלום"
            }
          ]
        },
        {
          "storeId": 289,
          "storeName": "טונר שופ",
          "branches": [
            {
              "branchId": 390,
              "branchName": "טונר שופ"
            }
          ]
        },
        {
          "storeId": 325,
          "storeName": "טוהר התקשורת אופיס פלוס",
          "branches": [
            {
              "branchId": 447,
              "branchName": "מאה שערים"
            },
            {
              "branchId": 534,
              "branchName": "סניף זכרון משה"
            },
            {
              "branchId": 444,
              "branchName": "סרוויס"
            },
            {
              "branchId": 532,
              "branchName": "רב ברכיה"
            },
            {
              "branchId": 446,
              "branchName": "סניף בן קיסמא"
            },
            {
              "branchId": 442,
              "branchName": "טוהר התקשורת אופיס פלוס"
            },
            {
              "branchId": 445,
              "branchName": "חפץ חיים"
            },
            {
              "branchId": 443,
              "branchName": "המרכזי 68"
            }
          ]
        },
        {
          "storeId": 361,
          "storeName": "אופיס ד",
          "branches": [
            {
              "branchId": 508,
              "branchName": "אופיס ד"
            }
          ]
        },
        {
          "storeId": 282,
          "storeName": "ccw",
          "branches": [
            {
              "branchId": 379,
              "branchName": "ccw"
            }
          ]
        },
        {
          "storeId": 399,
          "storeName": "סנטר נט",
          "branches": [
            {
              "branchId": 598,
              "branchName": "סנטר נט"
            }
          ]
        },
        {
          "storeId": 127,
          "storeName": "גרינט",
          "branches": [
            {
              "branchId": 165,
              "branchName": "גרינט -ראשי"
            }
          ]
        },
        {
          "storeId": 266,
          "storeName": "חותמנט",
          "branches": [
            {
              "branchId": 343,
              "branchName": "חותמנט"
            }
          ]
        },
        {
          "storeId": 375,
          "storeName": "ונתתי שלום בארץ",
          "branches": [
            {
              "branchId": 541,
              "branchName": "ונתתי שלום בארץ"
            }
          ]
        },
        {
          "storeId": 255,
          "storeName": "כולל תואי נוף הגליל",
          "branches": [
            {
              "branchId": 327,
              "branchName": "כולל תואי נוף הגליל"
            }
          ]
        },
        {
          "storeId": 161,
          "storeName": "קרית גת VIP - לא פעיל",
          "branches": [
            {
              "branchId": 145,
              "branchName": "קרית גת VIP -ראשי"
            }
          ]
        },
        {
          "storeId": 393,
          "storeName": "לימפיונט",
          "branches": [
            {
              "branchId": 583,
              "branchName": "לימפיונט"
            }
          ]
        },
        {
          "storeId": 168,
          "storeName": "אונליין",
          "branches": [
            {
              "branchId": 195,
              "branchName": "אונליין"
            }
          ]
        },
        {
          "storeId": 144,
          "storeName": "משרדי צפת",
          "branches": [
            {
              "branchId": 129,
              "branchName": "משרדי -ראשי"
            },
            {
              "branchId": 435,
              "branchName": "משרדי (טלטשווער כולל)"
            }
          ]
        },
        {
          "storeId": 136,
          "storeName": "קומפיוטר נט",
          "branches": [
            {
              "branchId": 548,
              "branchName": "דונולו נשים"
            },
            {
              "branchId": 495,
              "branchName": "דסלר נשים"
            },
            {
              "branchId": 71,
              "branchName": "דונולו גברים"
            },
            {
              "branchId": 512,
              "branchName": "חדר-מחשבים גברים - יבנה"
            },
            {
              "branchId": 248,
              "branchName": "חברון גברים"
            },
            {
              "branchId": 421,
              "branchName": "חתם סופר גברים"
            },
            {
              "branchId": 549,
              "branchName": "דונולו כפולות"
            },
            {
              "branchId": 545,
              "branchName": "דונלו נשים"
            },
            {
              "branchId": 496,
              "branchName": "השומר נשים"
            },
            {
              "branchId": 368,
              "branchName": "חברון כפולות"
            },
            {
              "branchId": 492,
              "branchName": "חתם סופר נשים"
            },
            {
              "branchId": 497,
              "branchName": "רוזובסקי נשים"
            },
            {
              "branchId": 514,
              "branchName": "חדר מחשבים נשים - יבנה"
            },
            {
              "branchId": 263,
              "branchName": "רוזובסקי גברים"
            },
            {
              "branchId": 420,
              "branchName": "יצחק מאיר הכהן גברים"
            },
            {
              "branchId": 73,
              "branchName": "השומר גברים"
            },
            {
              "branchId": 72,
              "branchName": "דסלר גברים"
            },
            {
              "branchId": 28,
              "branchName": "עקיבא נשים"
            },
            {
              "branchId": 502,
              "branchName": "חברון נשים"
            },
            {
              "branchId": 27,
              "branchName": "קאליש גברים"
            },
            {
              "branchId": 494,
              "branchName": "יצחק מאיר הכהן נשים"
            }
          ]
        },
        {
          "storeId": 333,
          "storeName": "Rabbi Dovid Churba",
          "branches": [
            {
              "branchId": 462,
              "branchName": "Rabbi Dovid Churba"
            }
          ]
        },
        {
          "storeId": 291,
          "storeName": "מחוק- כולל עטרת שלמה",
          "branches": [
            {
              "branchId": 394,
              "branchName": "פנחסי - קהילת רמבם"
            }
          ]
        },
        {
          "storeId": 114,
          "storeName": "קומפיוטר סרוויס ים",
          "branches": [
            {
              "branchId": 154,
              "branchName": "קומפיוטר סרוויס ים -ראשי"
            }
          ]
        },
        {
          "storeId": 334,
          "storeName": "דוד",
          "branches": [
            {
              "branchId": 463,
              "branchName": "דוד"
            }
          ]
        },
        {
          "storeId": 382,
          "storeName": "ניסוי-סאמיט",
          "branches": [
            {
              "branchId": 557,
              "branchName": "ניסוי-סאמיט"
            }
          ]
        },
        {
          "storeId": 316,
          "storeName": "רום",
          "branches": [
            {
              "branchId": 620,
              "branchName": "הצימר"
            },
            {
              "branchId": 622,
              "branchName": "שלטר"
            },
            {
              "branchId": 432,
              "branchName": "אקווה רום"
            }
          ]
        },
        {
          "storeId": 302,
          "storeName": "גמ\"ח מחשבים רמה ה",
          "branches": [
            {
              "branchId": 409,
              "branchName": "גמ\"ח מחשבים רמה ה"
            }
          ]
        },
        {
          "storeId": 165,
          "storeName": "ציקומט",
          "branches": [
            {
              "branchId": 191,
              "branchName": "ציקומט"
            }
          ]
        },
        {
          "storeId": 314,
          "storeName": "חזן",
          "branches": [
            {
              "branchId": 429,
              "branchName": "חזן"
            }
          ]
        },
        {
          "storeId": 143,
          "storeName": "אברהםשמש",
          "branches": [
            {
              "branchId": 158,
              "branchName": "אברהםשמש -ראשי"
            }
          ]
        },
        {
          "storeId": 211,
          "storeName": "חסדי נחמיה",
          "branches": [
            {
              "branchId": 255,
              "branchName": "רוזנטל שקים"
            }
          ]
        },
        {
          "storeId": 14,
          "storeName": "מגוון",
          "branches": [
            {
              "branchId": 100,
              "branchName": "מגוון -ראשי"
            }
          ]
        },
        {
          "storeId": 194,
          "storeName": "המחשב שלך",
          "branches": [
            {
              "branchId": 450,
              "branchName": "נתיבות שלום"
            },
            {
              "branchId": 235,
              "branchName": "המחשב שלך"
            }
          ]
        },
        {
          "storeId": 82,
          "storeName": "מג",
          "branches": [
            {
              "branchId": 114,
              "branchName": "מג -ראשי"
            }
          ]
        },
        {
          "storeId": 118,
          "storeName": "שולחן עבודה בהנגשה כשירה",
          "branches": [
            {
              "branchId": 535,
              "branchName": "גברים רב חלקיה בר טוביה "
            },
            {
              "branchId": 425,
              "branchName": "רב חנן"
            },
            {
              "branchId": 582,
              "branchName": "תלמוד תורה באיאן"
            },
            {
              "branchId": 562,
              "branchName": "נהרדעא -קשווי"
            },
            {
              "branchId": 77,
              "branchName": "אלישע הנביא"
            },
            {
              "branchId": 277,
              "branchName": "שדרות האמוראים ד3"
            },
            {
              "branchId": 17,
              "branchName": "מגן הרמה"
            },
            {
              "branchId": 424,
              "branchName": "מר עוקבא"
            },
            {
              "branchId": 87,
              "branchName": "מגן הרמה- רמה ג"
            },
            {
              "branchId": 65,
              "branchName": "ריבל"
            },
            {
              "branchId": 544,
              "branchName": "נהרדעא ד3"
            },
            {
              "branchId": 214,
              "branchName": "מרים הנביאה"
            },
            {
              "branchId": 239,
              "branchName": "ריש לקיש"
            },
            {
              "branchId": 361,
              "branchName": "תלמוד בבלי ד3"
            }
          ]
        },
        {
          "storeId": 236,
          "storeName": "הדר נט",
          "branches": [
            {
              "branchId": 299,
              "branchName": "הדר נט"
            }
          ]
        },
        {
          "storeId": 267,
          "storeName": "נט פלוס",
          "branches": [
            {
              "branchId": 386,
              "branchName": "בית וגן הפיסגה"
            },
            {
              "branchId": 344,
              "branchName": "אביי 49"
            },
            {
              "branchId": 571,
              "branchName": "סמינר בית וגן 99"
            }
          ]
        },
        {
          "storeId": 228,
          "storeName": "ספיר מזרחי",
          "branches": [
            {
              "branchId": 286,
              "branchName": "ספיר מזרחי"
            }
          ]
        },
        {
          "storeId": 326,
          "storeName": "קשר כשר",
          "branches": [
            {
              "branchId": 640,
              "branchName": "קשר כשר נווה יעקב"
            },
            {
              "branchId": 451,
              "branchName": "קשר כשר"
            }
          ]
        },
        {
          "storeId": 196,
          "storeName": "מוכשר.נט",
          "branches": [
            {
              "branchId": 238,
              "branchName": "כושר נט וורק"
            }
          ]
        },
        {
          "storeId": 187,
          "storeName": "WINDOWS 15",
          "branches": [
            {
              "branchId": 226,
              "branchName": "WINDOWS 15"
            }
          ]
        },
        {
          "storeId": 320,
          "storeName": "W מחשבים",
          "branches": [
            {
              "branchId": 460,
              "branchName": ""
            },
            {
              "branchId": 438,
              "branchName": "ברכיה נט"
            },
            {
              "branchId": 459,
              "branchName": "אמוראים נט"
            }
          ]
        },
        {
          "storeId": 182,
          "storeName": "אופיס סנטר פרמיום",
          "branches": [
            {
              "branchId": 218,
              "branchName": "אופיס סנטר פרמיום"
            }
          ]
        },
        {
          "storeId": 1,
          "storeName": "חנות דוגמה",
          "branches": [
            {
              "branchId": 638,
              "branchName": "חדש"
            },
            {
              "branchId": 1,
              "branchName": "רגיל"
            },
            {
              "branchId": 371,
              "branchName": "חדש"
            },
            {
              "branchId": 505,
              "branchName": "שם של הסניף"
            },
            {
              "branchId": 596,
              "branchName": "xbhlkfoej"
            },
            {
              "branchId": 6,
              "branchName": "ניסוי ק"
            },
            {
              "branchId": 88,
              "branchName": "ניסוי ב"
            }
          ]
        },
        {
          "storeId": 103,
          "storeName": "עמדות מחשב",
          "branches": [
            {
              "branchId": 10,
              "branchName": "עמדות מחשב"
            }
          ]
        },
        {
          "storeId": 262,
          "storeName": "ספייס",
          "branches": [
            {
              "branchId": 336,
              "branchName": "ספייס"
            }
          ]
        },
        {
          "storeId": 212,
          "storeName": "פנינת המחשב והסלולר",
          "branches": [
            {
              "branchId": 256,
              "branchName": "פנינת המחשב והסלולר"
            }
          ]
        },
        {
          "storeId": 312,
          "storeName": "אהרון שובקס",
          "branches": [
            {
              "branchId": 565,
              "branchName": "ברייער"
            },
            {
              "branchId": 427,
              "branchName": "אהרון שובקס"
            }
          ]
        },
        {
          "storeId": 398,
          "storeName": "דסקטופ",
          "branches": [
            {
              "branchId": 597,
              "branchName": "דסקטופ"
            }
          ]
        },
        {
          "storeId": 274,
          "storeName": "משרדי",
          "branches": [
            {
              "branchId": 351,
              "branchName": "משרדי"
            }
          ]
        },
        {
          "storeId": 237,
          "storeName": "מחשביקס",
          "branches": [
            {
              "branchId": 300,
              "branchName": "מחשביקס"
            }
          ]
        },
        {
          "storeId": 145,
          "storeName": "גשר",
          "branches": [
            {
              "branchId": 110,
              "branchName": "גשר -ראשי"
            }
          ]
        },
        {
          "storeId": 241,
          "storeName": "אנטר אשדוד",
          "branches": [
            {
              "branchId": 395,
              "branchName": "נשים"
            },
            {
              "branchId": 311,
              "branchName": "אנטר אשדוד"
            }
          ]
        },
        {
          "storeId": 164,
          "storeName": "מסוננט",
          "branches": [
            {
              "branchId": 189,
              "branchName": "מסוננט"
            }
          ]
        },
        {
          "storeId": 380,
          "storeName": "סייפנט",
          "branches": [
            {
              "branchId": 561,
              "branchName": "סייפנט"
            },
            {
              "branchId": 553,
              "branchName": "סייפנט-ראשי"
            },
            {
              "branchId": 560,
              "branchName": "סייפנט"
            }
          ]
        },
        {
          "storeId": 83,
          "storeName": "מגן עלייך",
          "branches": [
            {
              "branchId": 16,
              "branchName": "מגן עלייך"
            }
          ]
        },
        {
          "storeId": 298,
          "storeName": "עטרת שלמה מודיעין עיליתעטרת שלמה מודיעין עילית",
          "branches": [
            {
              "branchId": 404,
              "branchName": "כולל עטרת שלמה מודיעין עילית"
            }
          ]
        },
        {
          "storeId": 292,
          "storeName": "PLAY",
          "branches": [
            {
              "branchId": 594,
              "branchName": "מגדל העיר מחשבים"
            },
            {
              "branchId": 397,
              "branchName": "מגדל העיר"
            }
          ]
        },
        {
          "storeId": 323,
          "storeName": "אימייל פלוס",
          "branches": [
            {
              "branchId": 441,
              "branchName": "ראשי - חזון דוד"
            }
          ]
        },
        {
          "storeId": 370,
          "storeName": "שטיבלנט בני ברק",
          "branches": [
            {
              "branchId": 613,
              "branchName": "משרד"
            },
            {
              "branchId": 614,
              "branchName": "my offis"
            },
            {
              "branchId": 615,
              "branchName": "משרד"
            },
            {
              "branchId": 521,
              "branchName": "שטיבלנט בני ברק"
            }
          ]
        },
        {
          "storeId": 329,
          "storeName": "פרטנט",
          "branches": [
            {
              "branchId": 455,
              "branchName": "פרטנט גברים"
            },
            {
              "branchId": 500,
              "branchName": ""
            }
          ]
        },
        {
          "storeId": 281,
          "storeName": "אנטר רשבי",
          "branches": [
            {
              "branchId": 370,
              "branchName": "אנטר"
            }
          ]
        },
        {
          "storeId": 248,
          "storeName": "היכל זרח",
          "branches": [
            {
              "branchId": 319,
              "branchName": "היכל זרח"
            }
          ]
        },
        {
          "storeId": 87,
          "storeName": "ריינט הר יונה",
          "branches": [
            {
              "branchId": 175,
              "branchName": "ריינט הר יונה -ראשי"
            },
            {
              "branchId": 573,
              "branchName": "ריינט מחלקה חדשה"
            },
            {
              "branchId": 515,
              "branchName": "צ'קים"
            },
            {
              "branchId": 265,
              "branchName": "ריינט הר יונה נתיב"
            }
          ]
        },
        {
          "storeId": 229,
          "storeName": "מקלדת",
          "branches": [
            {
              "branchId": 287,
              "branchName": "מקלדת"
            }
          ]
        },
        {
          "storeId": 387,
          "storeName": "קליינט",
          "branches": [
            {
              "branchId": 569,
              "branchName": "קליינט"
            }
          ]
        },
        {
          "storeId": 10,
          "storeName": "חותם-ניסיון",
          "branches": [
            {
              "branchId": 98,
              "branchName": "חותם-ניסיון -ראשי"
            }
          ]
        },
        {
          "storeId": 384,
          "storeName": "קופי צפת",
          "branches": [
            {
              "branchId": 566,
              "branchName": "קופי צפת"
            }
          ]
        },
        {
          "storeId": 310,
          "storeName": "יואל לוי",
          "branches": [
            {
              "branchId": 422,
              "branchName": "יואל לוי"
            }
          ]
        },
        {
          "storeId": 368,
          "storeName": "מחוק",
          "branches": [
            {
              "branchId": 518,
              "branchName": "אלון אליה"
            }
          ]
        },
        {
          "storeId": 92,
          "storeName": "Enter",
          "branches": [
            {
              "branchId": 134,
              "branchName": "Enter -ראשי"
            }
          ]
        },
        {
          "storeId": 173,
          "storeName": "שטיבל נט שרותי מחשוב",
          "branches": [
            {
              "branchId": 202,
              "branchName": "שטיבל נט שרותי מחשוב"
            }
          ]
        },
        {
          "storeId": 26,
          "storeName": "שומר מסך",
          "branches": [
            {
              "branchId": 634,
              "branchName": "קרית יובל"
            },
            {
              "branchId": 45,
              "branchName": "שומר מסך"
            }
          ]
        },
        {
          "storeId": 367,
          "storeName": "אלון",
          "branches": [
            {
              "branchId": 517,
              "branchName": "אלון"
            }
          ]
        },
        {
          "storeId": 242,
          "storeName": "מחשב פלוס",
          "branches": [
            {
              "branchId": 312,
              "branchName": "מחשב פלוס"
            }
          ]
        },
        {
          "storeId": 226,
          "storeName": "חיה",
          "branches": [
            {
              "branchId": 285,
              "branchName": "חיה"
            }
          ]
        },
        {
          "storeId": 250,
          "storeName": "פינת מחשב",
          "branches": [
            {
              "branchId": 635,
              "branchName": "טיהרנט"
            },
            {
              "branchId": 321,
              "branchName": "מטהרנט"
            }
          ]
        },
        {
          "storeId": 89,
          "storeName": "פירסט קלאוד",
          "branches": [
            {
              "branchId": 559,
              "branchName": "פירסט קלאוד - אגף למעלה (נשים)"
            },
            {
              "branchId": 47,
              "branchName": "פירסט קלאוד"
            }
          ]
        },
        {
          "storeId": 224,
          "storeName": "Net Go",
          "branches": [
            {
              "branchId": 282,
              "branchName": "Net Go"
            },
            {
              "branchId": 584,
              "branchName": "12 Cazenove Main"
            }
          ]
        },
        {
          "storeId": 294,
          "storeName": "ישעיה לנדי",
          "branches": [
            {
              "branchId": 399,
              "branchName": "ישעיה לנדי"
            }
          ]
        },
        {
          "storeId": 300,
          "storeName": "שקל הקודש נדבורנה",
          "branches": [
            {
              "branchId": 407,
              "branchName": "פאר יענעם נדבורנה"
            }
          ]
        },
        {
          "storeId": 225,
          "storeName": "צ'יק צ'ק",
          "branches": [
            {
              "branchId": 284,
              "branchName": "עפולה"
            }
          ]
        },
        {
          "storeId": 258,
          "storeName": "מושב יסודות - בית הכנסת",
          "branches": [
            {
              "branchId": 331,
              "branchName": "מושב יסודות - בית הכנסת"
            }
          ]
        },
        {
          "storeId": 358,
          "storeName": "באר מרים",
          "branches": [
            {
              "branchId": 498,
              "branchName": "באר מרים"
            }
          ]
        },
        {
          "storeId": 133,
          "storeName": "נטוכשר",
          "branches": [
            {
              "branchId": 173,
              "branchName": "נטוכשר -ראשי"
            }
          ]
        },
        {
          "storeId": 351,
          "storeName": "אונליין בית שמש",
          "branches": [
            {
              "branchId": 489,
              "branchName": "אונליין בית שמש"
            }
          ]
        },
        {
          "storeId": 349,
          "storeName": "זכרון שלמה",
          "branches": [
            {
              "branchId": 486,
              "branchName": "זכרון שלמה"
            }
          ]
        },
        {
          "storeId": 102,
          "storeName": "מטח ירוק",
          "branches": [
            {
              "branchId": 138,
              "branchName": "מטח ירוק -ראשי"
            }
          ]
        },
        {
          "storeId": 386,
          "storeName": "חנות המחשבים שלי",
          "branches": [
            {
              "branchId": 568,
              "branchName": "חנות המחשבים שלי"
            }
          ]
        },
        {
          "storeId": 48,
          "storeName": "א ווינקל",
          "branches": []
        },
        {
          "storeId": 215,
          "storeName": "deleted",
          "branches": [
            {
              "branchId": 262,
              "branchName": "HCC"
            }
          ]
        },
        {
          "storeId": 116,
          "storeName": "Platinum",
          "branches": [
            {
              "branchId": 507,
              "branchName": "Private Booths"
            },
            {
              "branchId": 155,
              "branchName": "Platinum -ראשי"
            }
          ]
        },
        {
          "storeId": 306,
          "storeName": "Offices Plus VIP",
          "branches": [
            {
              "branchId": 414,
              "branchName": "Offices Plus VIP"
            }
          ]
        },
        {
          "storeId": 233,
          "storeName": "ויאיפי- אשדוד",
          "branches": [
            {
              "branchId": 295,
              "branchName": "ויאיפי- אשדוד"
            }
          ]
        },
        {
          "storeId": 235,
          "storeName": "סרוויסנט",
          "branches": [
            {
              "branchId": 298,
              "branchName": "סרוויסנט"
            }
          ]
        },
        {
          "storeId": 27,
          "storeName": "מהדרינט",
          "branches": [
            {
              "branchId": 353,
              "branchName": "קרית ספר"
            },
            {
              "branchId": 34,
              "branchName": "מהדרינט סוקולוב גברים"
            },
            {
              "branchId": 205,
              "branchName": "צירילסון"
            },
            {
              "branchId": 35,
              "branchName": "מהדרינט סוקולוב נשים"
            },
            {
              "branchId": 355,
              "branchName": "אבוחצירא"
            },
            {
              "branchId": 325,
              "branchName": "רבי עקיבא 129"
            },
            {
              "branchId": 354,
              "branchName": "ברכפלד"
            },
            {
              "branchId": 181,
              "branchName": "כהנמן"
            },
            {
              "branchId": 30,
              "branchName": "מהדרינט אלישע"
            },
            {
              "branchId": 36,
              "branchName": "מהדרינט ברטנורא נשים"
            },
            {
              "branchId": 31,
              "branchName": "מהדרינט השלושה"
            },
            {
              "branchId": 79,
              "branchName": "מהדרינט יגאל אלון"
            },
            {
              "branchId": 223,
              "branchName": "מהדרינט- צייטלין"
            },
            {
              "branchId": 337,
              "branchName": "דסלר"
            },
            {
              "branchId": 324,
              "branchName": "נחמיה"
            },
            {
              "branchId": 182,
              "branchName": "הושע"
            },
            {
              "branchId": 206,
              "branchName": "צקים"
            },
            {
              "branchId": 224,
              "branchName": "מהדרינט- בן פתחיה"
            },
            {
              "branchId": 32,
              "branchName": "מהדרינט ברטנורא"
            },
            {
              "branchId": 33,
              "branchName": "מהדרינט רבי עקיבא"
            }
          ]
        },
        {
          "storeId": 277,
          "storeName": "בני הישיבות נווה יעקב",
          "branches": [
            {
              "branchId": 357,
              "branchName": "בני הישיבות נווה יעקב"
            }
          ]
        },
        {
          "storeId": 129,
          "storeName": "Space",
          "branches": [
            {
              "branchId": 164,
              "branchName": "Space -ראשי"
            }
          ]
        },
        {
          "storeId": 221,
          "storeName": "Comfort Kiosk",
          "branches": [
            {
              "branchId": 278,
              "branchName": "Comfort Kiosk"
            }
          ]
        },
        {
          "storeId": 377,
          "storeName": "rrrrr",
          "branches": [
            {
              "branchId": 550,
              "branchName": "rrrrr"
            }
          ]
        },
        {
          "storeId": 308,
          "storeName": "אריה כץ",
          "branches": [
            {
              "branchId": 417,
              "branchName": "אריה כץ"
            }
          ]
        },
        {
          "storeId": 32,
          "storeName": "חדר מחשבים מעלה עמוס - לא פעיל",
          "branches": [
            {
              "branchId": 115,
              "branchName": "חדר מחשבים מעלה עמוס -ראשי"
            }
          ]
        },
        {
          "storeId": 209,
          "storeName": "צעצועט",
          "branches": [
            {
              "branchId": 253,
              "branchName": "צעצועט"
            }
          ]
        },
        {
          "storeId": 9,
          "storeName": "חושב_מאש",
          "branches": [
            {
              "branchId": 105,
              "branchName": "חושב_מאש -ראשי"
            }
          ]
        },
        {
          "storeId": 74,
          "storeName": "משרד כהלכה",
          "branches": [
            {
              "branchId": 150,
              "branchName": "משרד כהלכה -ראשי"
            }
          ]
        },
        {
          "storeId": 301,
          "storeName": "בן דוד",
          "branches": [
            {
              "branchId": 408,
              "branchName": "בן דוד"
            }
          ]
        },
        {
          "storeId": 297,
          "storeName": "עמדות מחשב מקצועיות",
          "branches": [
            {
              "branchId": 403,
              "branchName": "עמדות מחשב מקצועיות"
            },
            {
              "branchId": 416,
              "branchName": "מכונת תשלום"
            }
          ]
        },
        {
          "storeId": 379,
          "storeName": "אוהל יוסף",
          "branches": [
            {
              "branchId": 552,
              "branchName": "אוהל יוסף"
            }
          ]
        },
        {
          "storeId": 192,
          "storeName": "משרדיה",
          "branches": [
            {
              "branchId": 233,
              "branchName": "משרדיה"
            }
          ]
        },
        {
          "storeId": 206,
          "storeName": "גמחשבים רכסים",
          "branches": [
            {
              "branchId": 250,
              "branchName": "גמחשבים רכסים"
            }
          ]
        },
        {
          "storeId": 86,
          "storeName": "משולם",
          "branches": [
            {
              "branchId": 174,
              "branchName": "משולם -ראשי"
            }
          ]
        },
        {
          "storeId": 260,
          "storeName": "קהילת משך חכמה",
          "branches": [
            {
              "branchId": 334,
              "branchName": "נפתלי שפיגל"
            }
          ]
        },
        {
          "storeId": 346,
          "storeName": "פירסטקלאס (firstclass)",
          "branches": [
            {
              "branchId": 475,
              "branchName": "פירסטקלאס (firstclass)"
            },
            {
              "branchId": 476,
              "branchName": ""
            }
          ]
        },
        {
          "storeId": 91,
          "storeName": "נט קוויק",
          "branches": [
            {
              "branchId": 186,
              "branchName": "נט קוויק חיים עוזר"
            },
            {
              "branchId": 24,
              "branchName": "נטקוויק זוננפלד"
            }
          ]
        },
        {
          "storeId": 121,
          "storeName": "היימישנט",
          "branches": [
            {
              "branchId": 160,
              "branchName": "היימישנט - ירושלים"
            }
          ]
        },
        {
          "storeId": 378,
          "storeName": "ffff",
          "branches": [
            {
              "branchId": 551,
              "branchName": "ffff"
            }
          ]
        },
        {
          "storeId": 287,
          "storeName": "משרד פלוס",
          "branches": [
            {
              "branchId": 388,
              "branchName": "משרד פלוס"
            },
            {
              "branchId": 519,
              "branchName": "קרייה"
            },
            {
              "branchId": 523,
              "branchName": "קרייה"
            }
          ]
        },
        {
          "storeId": 36,
          "storeName": "ריינט חיפה",
          "branches": [
            {
              "branchId": 58,
              "branchName": "ריינט חיפה גברים"
            },
            {
              "branchId": 59,
              "branchName": "ריינט חיפה נשים"
            },
            {
              "branchId": 217,
              "branchName": "ריינט חיפה- עמדת תשלום"
            }
          ]
        },
        {
          "storeId": 374,
          "storeName": "כושרמייל",
          "branches": [
            {
              "branchId": 537,
              "branchName": "כושרמייל"
            },
            {
              "branchId": 536,
              "branchName": "כושרמייל"
            },
            {
              "branchId": 538,
              "branchName": "כושרמייל"
            },
            {
              "branchId": 533,
              "branchName": "כושרמייל"
            }
          ]
        },
        {
          "storeId": 6,
          "storeName": "חדרה",
          "branches": [
            {
              "branchId": 94,
              "branchName": "חדרה -ראשי"
            }
          ]
        },
        {
          "storeId": 278,
          "storeName": "ישיבת מיר",
          "branches": [
            {
              "branchId": 358,
              "branchName": "ישיבת מיר"
            }
          ]
        },
        {
          "storeId": 359,
          "storeName": "קול יהודה",
          "branches": [
            {
              "branchId": 503,
              "branchName": "קול יהודה"
            }
          ]
        },
        {
          "storeId": 256,
          "storeName": "תורת הבית",
          "branches": [
            {
              "branchId": 328,
              "branchName": "תורת הבית"
            }
          ]
        },
        {
          "storeId": 189,
          "storeName": "KosherNet",
          "branches": [
            {
              "branchId": 228,
              "branchName": "KosherNet"
            }
          ]
        },
        {
          "storeId": 259,
          "storeName": "כלבונט",
          "branches": [
            {
              "branchId": 332,
              "branchName": "כלבונט"
            }
          ]
        },
        {
          "storeId": 23,
          "storeName": "כתר",
          "branches": [
            {
              "branchId": 108,
              "branchName": "כתר -ראשי"
            }
          ]
        },
        {
          "storeId": 141,
          "storeName": "אפריון",
          "branches": [
            {
              "branchId": 159,
              "branchName": "אפריון -ראשי"
            }
          ]
        },
        {
          "storeId": 153,
          "storeName": "משרד ברמה",
          "branches": [
            {
              "branchId": 139,
              "branchName": "משרד ברמה רבינא 7"
            },
            {
              "branchId": 381,
              "branchName": "משרד רמה ד' אביי 7"
            }
          ]
        },
        {
          "storeId": 309,
          "storeName": "Nakiwork",
          "branches": [
            {
              "branchId": 418,
              "branchName": "Nakiwork"
            }
          ]
        },
        {
          "storeId": 336,
          "storeName": "מחשב יהודי",
          "branches": [
            {
              "branchId": 465,
              "branchName": "מחשב יהודי"
            }
          ]
        },
        {
          "storeId": 11,
          "storeName": "ש.בלום",
          "branches": [
            {
              "branchId": 141,
              "branchName": "ש.בלום -ראשי"
            }
          ]
        },
        {
          "storeId": 30,
          "storeName": "מוגנט",
          "branches": [
            {
              "branchId": 74,
              "branchName": "מוגנט"
            }
          ]
        },
        {
          "storeId": 15,
          "storeName": "The Brooklyn Kiosk",
          "branches": [
            {
              "branchId": 109,
              "branchName": "The Brooklyn Kiosk -ראשי"
            }
          ]
        },
        {
          "storeId": 93,
          "storeName": "שטיבלנט אלעד",
          "branches": [
            {
              "branchId": 261,
              "branchName": "שטיבלנט"
            },
            {
              "branchId": 125,
              "branchName": "דיגיטל כשר"
            }
          ]
        },
        {
          "storeId": 134,
          "storeName": "קומפיוטר פלוס",
          "branches": [
            {
              "branchId": 170,
              "branchName": "קומפיוטר פלוס -ראשי"
            }
          ]
        },
        {
          "storeId": 365,
          "storeName": "קומפיוטר י",
          "branches": [
            {
              "branchId": 528,
              "branchName": "עזרא"
            },
            {
              "branchId": 527,
              "branchName": "דוד ילין 3"
            },
            {
              "branchId": 513,
              "branchName": "קומפיוטר דוד ילין"
            }
          ]
        },
        {
          "storeId": 376,
          "storeName": "בית כנסת המרכזי רמה ג בית שמש",
          "branches": [
            {
              "branchId": 547,
              "branchName": "בית כנסת המרכזי רמה ג בית שמש"
            }
          ]
        },
        {
          "storeId": 162,
          "storeName": "קורנט",
          "branches": [
            {
              "branchId": 180,
              "branchName": "ביתר מ-ראשי"
            }
          ]
        },
        {
          "storeId": 319,
          "storeName": "אנטר צפת",
          "branches": [
            {
              "branchId": 437,
              "branchName": "אנטר"
            }
          ]
        },
        {
          "storeId": 238,
          "storeName": "פסגת זאב",
          "branches": [
            {
              "branchId": 301,
              "branchName": "משכנות יעקב"
            }
          ]
        },
        {
          "storeId": 343,
          "storeName": "דרך אמונה",
          "branches": [
            {
              "branchId": 472,
              "branchName": "דרך השם"
            }
          ]
        },
        {
          "storeId": 249,
          "storeName": "קופת הצדקה רמות ד",
          "branches": [
            {
              "branchId": 320,
              "branchName": "קופת הצדקה רמות ד"
            }
          ]
        },
        {
          "storeId": 108,
          "storeName": "שמש",
          "branches": [
            {
              "branchId": 136,
              "branchName": "שמש -ראשי"
            }
          ]
        },
        {
          "storeId": 252,
          "storeName": "חרישנט",
          "branches": [
            {
              "branchId": 323,
              "branchName": "חרישנט"
            }
          ]
        },
        {
          "storeId": 354,
          "storeName": "באר מרים טבריה",
          "branches": [
            {
              "branchId": 491,
              "branchName": "באר מרים טבריה"
            }
          ]
        },
        {
          "storeId": 311,
          "storeName": "אופיס-נט",
          "branches": [
            {
              "branchId": 449,
              "branchName": "פאר הנצח"
            },
            {
              "branchId": 426,
              "branchName": "אופיס-נט"
            }
          ]
        },
        {
          "storeId": 299,
          "storeName": "משה בר",
          "branches": [
            {
              "branchId": 405,
              "branchName": "שרה בר"
            }
          ]
        },
        {
          "storeId": 163,
          "storeName": "שומר  מסך  גבש",
          "branches": [
            {
              "branchId": 183,
              "branchName": "שומר  מסך  גבש"
            }
          ]
        },
        {
          "storeId": 140,
          "storeName": "פתרון- לא פעיל",
          "branches": [
            {
              "branchId": 153,
              "branchName": "פתרון -ראשי"
            }
          ]
        },
        {
          "storeId": 315,
          "storeName": "Local-ישן לא פעיל",
          "branches": [
            {
              "branchId": 430,
              "branchName": "315"
            }
          ]
        },
        {
          "storeId": 283,
          "storeName": "מחושב ומיושב",
          "branches": [
            {
              "branchId": 380,
              "branchName": "מחושב ומיושב"
            }
          ]
        },
        {
          "storeId": 85,
          "storeName": "סייפטינט",
          "branches": [
            {
              "branchId": 5,
              "branchName": "סייפטינט בני ברק"
            },
            {
              "branchId": 90,
              "branchName": "נתיבות שלום"
            },
            {
              "branchId": 91,
              "branchName": "מסילת יוסף"
            },
            {
              "branchId": 89,
              "branchName": "יהודה הנשיא"
            }
          ]
        },
        {
          "storeId": 240,
          "storeName": "DIVREI MOSHE TINY KIOSK",
          "branches": [
            {
              "branchId": 304,
              "branchName": "DIVREI MOSHE TINY KIOSK"
            }
          ]
        },
        {
          "storeId": 245,
          "storeName": "אופיס פלוס",
          "branches": [
            {
              "branchId": 315,
              "branchName": "אופיס פלוס"
            },
            {
              "branchId": 359,
              "branchName": "אופיס פלוס מאש"
            }
          ]
        },
        {
          "storeId": 234,
          "storeName": "ריינט רמא",
          "branches": [
            {
              "branchId": 296,
              "branchName": "ריינט רמא"
            }
          ]
        },
        {
          "storeId": 231,
          "storeName": "לייבי בלאקר",
          "branches": [
            {
              "branchId": 293,
              "branchName": "לייבי בלאקר"
            }
          ]
        },
        {
          "storeId": 303,
          "storeName": "נטפרי מחשבים",
          "branches": [
            {
              "branchId": 410,
              "branchName": "נטפרי מחשבים"
            }
          ]
        },
        {
          "storeId": 280,
          "storeName": "כשמיר (עמלי תורה)",
          "branches": [
            {
              "branchId": 364,
              "branchName": "כשמיר (עמלי תורה)"
            }
          ]
        },
        {
          "storeId": 177,
          "storeName": "Kosher click",
          "branches": [
            {
              "branchId": 210,
              "branchName": "Kosher click"
            }
          ]
        },
        {
          "storeId": 38,
          "storeName": "קונטרול",
          "branches": [
            {
              "branchId": 18,
              "branchName": "קונטרול"
            }
          ]
        },
        {
          "storeId": 341,
          "storeName": "private kiosk",
          "branches": [
            {
              "branchId": 470,
              "branchName": "private kiosk"
            }
          ]
        },
        {
          "storeId": 327,
          "storeName": "גמח מחשבים הר יונה",
          "branches": [
            {
              "branchId": 453,
              "branchName": "גמח מחשבים הר יונה"
            }
          ]
        },
        {
          "storeId": 59,
          "storeName": "מיין אופיס ב\"ש",
          "branches": [
            {
              "branchId": 216,
              "branchName": "מיין אופיס מאש"
            },
            {
              "branchId": 146,
              "branchName": "גלאט אופיס בש -ראשי"
            },
            {
              "branchId": 68,
              "branchName": "מיין אופיס בש"
            },
            {
              "branchId": 580,
              "branchName": "מיין אופיס חפציבה"
            },
            {
              "branchId": 69,
              "branchName": "מיין אופיס קריה חזו\"א"
            }
          ]
        },
        {
          "storeId": 270,
          "storeName": "DATABASE KIOSKS",
          "branches": [
            {
              "branchId": 349,
              "branchName": "DATABASE KIOSKS"
            }
          ]
        },
        {
          "storeId": 185,
          "storeName": "פרדס-נט",
          "branches": [
            {
              "branchId": 222,
              "branchName": "פרדס-נט"
            }
          ]
        },
        {
          "storeId": 296,
          "storeName": "שולמן יוסף",
          "branches": [
            {
              "branchId": 402,
              "branchName": "אליהו בית צורי1 "
            },
            {
              "branchId": 401,
              "branchName": "שולמן יוסף"
            }
          ]
        },
        {
          "storeId": 29,
          "storeName": "מיין אופיס",
          "branches": [
            {
              "branchId": 7,
              "branchName": "מיין אופיס"
            },
            {
              "branchId": 8,
              "branchName": "גלאט נט עלי הכהן"
            }
          ]
        },
        {
          "storeId": 322,
          "storeName": "גבעת המורה - עפולה",
          "branches": [
            {
              "branchId": 440,
              "branchName": "צ'יק צ'ק"
            }
          ]
        },
        {
          "storeId": 366,
          "storeName": "חרך",
          "branches": [
            {
              "branchId": 516,
              "branchName": "חרך"
            }
          ]
        },
        {
          "storeId": 195,
          "storeName": "א היימישע office",
          "branches": [
            {
              "branchId": 236,
              "branchName": "א היימישע office"
            }
          ]
        },
        {
          "storeId": 105,
          "storeName": "רויטמן",
          "branches": [
            {
              "branchId": 130,
              "branchName": "רויטמן -ראשי"
            }
          ]
        },
        {
          "storeId": 232,
          "storeName": "נטו נט",
          "branches": [
            {
              "branchId": 294,
              "branchName": "נטו נט"
            }
          ]
        },
        {
          "storeId": 342,
          "storeName": "בית כנסת בית השם",
          "branches": [
            {
              "branchId": 471,
              "branchName": "בית כנסת בית השם"
            }
          ]
        },
        {
          "storeId": 84,
          "storeName": "כשר מייל",
          "branches": [
            {
              "branchId": 178,
              "branchName": "כשר מייל -ראשי"
            }
          ]
        },
        {
          "storeId": 94,
          "storeName": "Kiosk On 18",
          "branches": [
            {
              "branchId": 124,
              "branchName": "Kiosk On 18 -main"
            },
            {
              "branchId": 316,
              "branchName": "Kiosk 5T"
            },
            {
              "branchId": 257,
              "branchName": "Kiosk on 16"
            }
          ]
        },
        {
          "storeId": 172,
          "storeName": "נטו מהודר ב\"ש",
          "branches": [
            {
              "branchId": 200,
              "branchName": "נטו מהודר"
            }
          ]
        },
        {
          "storeId": 170,
          "storeName": "לכתחילה",
          "branches": [
            {
              "branchId": 197,
              "branchName": "לכתחילה"
            }
          ]
        },
        {
          "storeId": 5,
          "storeName": "אופקנט",
          "branches": [
            {
              "branchId": 511,
              "branchName": "אופקנט רמת שקד"
            },
            {
              "branchId": 97,
              "branchName": "אופקנט -ראשי"
            }
          ]
        },
        {
          "storeId": 357,
          "storeName": "קיוסק93",
          "branches": [
            {
              "branchId": 493,
              "branchName": "קיוסק93"
            }
          ]
        },
        {
          "storeId": 371,
          "storeName": "גלאט נט",
          "branches": [
            {
              "branchId": 525,
              "branchName": "גלאט נט"
            },
            {
              "branchId": 529,
              "branchName": "kojkijij"
            }
          ]
        },
        {
          "storeId": 251,
          "storeName": "אס אמ טי שירותי מחשוב",
          "branches": [
            {
              "branchId": 558,
              "branchName": "פילטר ציקים"
            },
            {
              "branchId": 322,
              "branchName": "אס אמ טי שירותי מחשוב"
            }
          ]
        },
        {
          "storeId": 214,
          "storeName": "טאבלטים",
          "branches": [
            {
              "branchId": 259,
              "branchName": "תצוגת טאבלט"
            }
          ]
        },
        {
          "storeId": 154,
          "storeName": "גלאט אופיס בש",
          "branches": []
        },
        {
          "storeId": 373,
          "storeName": "פילטר נט",
          "branches": [
            {
              "branchId": 531,
              "branchName": "פילטר נט"
            }
          ]
        },
        {
          "storeId": 159,
          "storeName": "לינקנט רמות",
          "branches": [
            {
              "branchId": 86,
              "branchName": "רמות א פורוש"
            }
          ]
        },
        {
          "storeId": 180,
          "storeName": "WorkZone",
          "branches": [
            {
              "branchId": 213,
              "branchName": "WorkZone"
            }
          ]
        },
        {
          "storeId": 176,
          "storeName": "משרד מחוץ לבית",
          "branches": [
            {
              "branchId": 209,
              "branchName": "משרד מחוץ לבית"
            }
          ]
        },
        {
          "storeId": 113,
          "storeName": "קישורית",
          "branches": [
            {
              "branchId": 166,
              "branchName": "קישורית"
            },
            {
              "branchId": 542,
              "branchName": "סימפל פרינט"
            }
          ]
        },
        {
          "storeId": 364,
          "storeName": "חדר-מחשבים",
          "branches": []
        },
        {
          "storeId": 175,
          "storeName": "שמור",
          "branches": [
            {
              "branchId": 208,
              "branchName": "שמור"
            }
          ]
        },
        {
          "storeId": 179,
          "storeName": "תורה וחסד",
          "branches": [
            {
              "branchId": 212,
              "branchName": "תורה וחסד"
            }
          ]
        },
        {
          "storeId": 184,
          "storeName": "Compubicles",
          "branches": [
            {
              "branchId": 524,
              "branchName": "אהליאב"
            },
            {
              "branchId": 221,
              "branchName": "זית רענן"
            }
          ]
        },
        {
          "storeId": 106,
          "storeName": "Cubicles south",
          "branches": [
            {
              "branchId": 132,
              "branchName": "Cubicles south -ראשי"
            }
          ]
        },
        {
          "storeId": 147,
          "storeName": "מקוונט",
          "branches": [
            {
              "branchId": 78,
              "branchName": "מקוונט"
            }
          ]
        },
        {
          "storeId": 202,
          "storeName": "סנטר עמדות מחשב",
          "branches": [
            {
              "branchId": 247,
              "branchName": "סנטר עמדות מחשב"
            }
          ]
        },
        {
          "storeId": 207,
          "storeName": "כושרנט בב",
          "branches": [
            {
              "branchId": 251,
              "branchName": "כושרנט בב"
            },
            {
              "branchId": 504,
              "branchName": "כשרנט שמעון"
            }
          ]
        },
        {
          "storeId": 305,
          "storeName": "דוד לוי",
          "branches": [
            {
              "branchId": 413,
              "branchName": "דוד לוי"
            }
          ]
        },
        {
          "storeId": 201,
          "storeName": "פתרון2",
          "branches": [
            {
              "branchId": 273,
              "branchName": "פתרון ים"
            },
            {
              "branchId": 246,
              "branchName": "פתרון2"
            }
          ]
        },
        {
          "storeId": 112,
          "storeName": "CIP",
          "branches": [
            {
              "branchId": 156,
              "branchName": "CIP -ראשי"
            }
          ]
        },
        {
          "storeId": 279,
          "storeName": "אופיס פלוס מאש",
          "branches": [
            {
              "branchId": 374,
              "branchName": "אופיס פלוס"
            },
            {
              "branchId": 363,
              "branchName": "אופיס פלוס מאש"
            }
          ]
        },
        {
          "storeId": 13,
          "storeName": "בלום_מיר",
          "branches": [
            {
              "branchId": 93,
              "branchName": "בלום_מיר -ראשי"
            }
          ]
        },
        {
          "storeId": 126,
          "storeName": "Enter2",
          "branches": [
            {
              "branchId": 157,
              "branchName": "Enter2 -ראשי"
            }
          ]
        },
        {
          "storeId": 104,
          "storeName": "קומפינט",
          "branches": [
            {
              "branchId": 270,
              "branchName": "קומפינט מערב"
            },
            {
              "branchId": 431,
              "branchName": "קומפינט נשים"
            },
            {
              "branchId": 269,
              "branchName": "קומפינט גברים"
            },
            {
              "branchId": 131,
              "branchName": "קומפינט נשים"
            }
          ]
        },
        {
          "storeId": 290,
          "storeName": "excel computer room",
          "branches": [
            {
              "branchId": 392,
              "branchName": "Excel נט"
            }
          ]
        },
        {
          "storeId": 24,
          "storeName": "מגן",
          "branches": [
            {
              "branchId": 113,
              "branchName": "מגן -ראשי"
            }
          ]
        },
        {
          "storeId": 146,
          "storeName": "תלת מימד",
          "branches": [
            {
              "branchId": 317,
              "branchName": "תלת מימד עפולה"
            },
            {
              "branchId": 99,
              "branchName": "תלת מימד -ראשי"
            }
          ]
        },
        {
          "storeId": 362,
          "storeName": "cubicles booths",
          "branches": [
            {
              "branchId": 509,
              "branchName": "cubicles booths"
            },
            {
              "branchId": 540,
              "branchName": "PRIVATE BOOTHS"
            }
          ]
        },
        {
          "storeId": 337,
          "storeName": "המשרדקג",
          "branches": [
            {
              "branchId": 466,
              "branchName": "המשרד קרית גת"
            }
          ]
        },
        {
          "storeId": 49,
          "storeName": "פאזל",
          "branches": [
            {
              "branchId": 106,
              "branchName": "פאזל -ראשי"
            }
          ]
        },
        {
          "storeId": 12,
          "storeName": "כושרנט",
          "branches": [
            {
              "branchId": 9,
              "branchName": "כושר נט"
            },
            {
              "branchId": 61,
              "branchName": "כושר נט רמות ג"
            },
            {
              "branchId": 229,
              "branchName": "רמות א"
            },
            {
              "branchId": 62,
              "branchName": "כושרנט בית שמש"
            }
          ]
        },
        {
          "storeId": 100,
          "storeName": "Cubicles",
          "branches": [
            {
              "branchId": 133,
              "branchName": "Cubicles -ראשי"
            }
          ]
        },
        {
          "storeId": 171,
          "storeName": "רובין איי טי",
          "branches": [
            {
              "branchId": 198,
              "branchName": "רובין איי טי"
            }
          ]
        },
        {
          "storeId": 383,
          "storeName": "נטספייס",
          "branches": [
            {
              "branchId": 563,
              "branchName": "נטספייס"
            },
            {
              "branchId": 564,
              "branchName": "נטספייס"
            }
          ]
        },
        {
          "storeId": 293,
          "storeName": "אנטר רשבא",
          "branches": [
            {
              "branchId": 398,
              "branchName": "אנטר 2"
            }
          ]
        },
        {
          "storeId": 132,
          "storeName": "clinet",
          "branches": [
            {
              "branchId": 167,
              "branchName": "clinet -ראשי"
            }
          ]
        },
        {
          "storeId": 131,
          "storeName": "KEZ-002",
          "branches": [
            {
              "branchId": 169,
              "branchName": "KEZ-002 -ראשי"
            }
          ]
        },
        {
          "storeId": 42,
          "storeName": "פוטו פוינט",
          "branches": [
            {
              "branchId": 120,
              "branchName": "פוטו פרינט -ראשי"
            }
          ]
        },
        {
          "storeId": 243,
          "storeName": "טרייסמןח",
          "branches": [
            {
              "branchId": 313,
              "branchName": "טרייסמןח"
            }
          ]
        }
      ]
    // Stores database
    // Stores database will be loaded from embedded data
    $scope.storeNamesMap = {};
    $scope.branchNamesMap = {};
    
    // Initialize sorting variables
    $scope.sortField = 'totalLoadings';
    $scope.sortReverse = true;
    
    // Initialize computer filters
    $scope.computerFilters = {
        store: '',
        branch: ''
    };
    
    // Filtered computers data
    $scope.filteredComputersData = [];
    
    // Store filters for active computers report
    $scope.storeFilter = '';
    $scope.computerStatusFilter = '';
    $scope.storesData = [];
    $scope.filteredStoresData = [];

    // Stations data
    $scope.stationsData = [];
    $scope.filteredStationsData = [];
    
    // Computers data
    $scope.computersData = [];

    // Initialize
    $scope.init = function () {
        // Load stores database
        $scope.loadStoresDatabase();
    };

    // Load stores database from embedded data
    $scope.loadStoresDatabase = function() {
        // Use the embedded stores database that was added to app.js
        $scope.storesDatabase = window.storesDatabase || [];
        $scope.storeNamesMap = {};
        $scope.branchNamesMap = {};
        
        // Create lookup maps for quick access
        $scope.storesDatabase.forEach(function(store) {
            $scope.storeNamesMap[store.storeId] = store.storeName;
            if (store.branches) {
                store.branches.forEach(function(branch) {
                    $scope.branchNamesMap[branch.branchId] = branch.branchName;
                });
            }
        });
        console.log('Stores database loaded successfully from embedded data');
    };

    // Get store name by ID
    $scope.getStoreName = function (storeId) {
        const storeName = $scope.storeNamesMap[storeId];
        return storeName ? `${storeId} - ${storeName}` : `חנות ${storeId}`;
    };

    // Get branch name by ID
    $scope.getBranchName = function (branchId) {
        const branchName = $scope.branchNamesMap[branchId];
        return branchName ? `${branchId} - ${branchName}` : `סניף ${branchId}`;
    };

    // Login Function - using existing getLeads method
    $scope.login = function () {
        $scope.loading = true;
        
        // Use the existing getLeads method
        $scope.getLeads();
    };

    // Logout Function
    $scope.logout = function () {
        // Clear all data
        $scope.isLoggedIn = false;
        $scope.leads = [];
        $scope.actions = [];
        $scope.ad = null;
        $scope.filteredLeads = [];
        $scope.filteredActions = [];
        $scope.stationsData = [];
        $scope.filteredStationsData = [];
        
        // Clear filters
        $scope.filters = {
            store: '',
            branch: '',
            computer: '',
            actionType: '',
            startDate: '',
            endDate: ''
        };
        $scope.stationFilters = {
            store: '',
            startDate: '',
            endDate: ''
        };
        $scope.showDeletedLeads = false;
        
        // Clear credentials
        $scope.credentials = {
            userName: '',
            password: ''
        };
        
        // Clear computers data
        $scope.computersData = [];
        
        // Show success message
        alert('התנתקת בהצלחה. תוכלי להתחבר מחדש עם פרטים אחרים.');
    };

    // Existing getLeads method from your code - Updated to use CORS Proxy
    $scope.getLeads = function () {
        $http.post('https://corsproxy.io/?' + encodeURIComponent('https://ads.safer.link/advertiser/getLeads'), { 
            userName: $scope.credentials.userName, 
            password: $scope.credentials.password 
        }).then(function (response) {
            $scope.ad = response.data.ad;
            $scope.actions = response.data.actions;
            $scope.leads = response.data.leads;
            
            // Process leads quality using your existing method
            $scope.leads.forEach(function (lead) {
                lead.quality = $scope.checkLeadQuality(lead);
                lead.store_branch_computer = $scope.extractStoreBranchComputer(lead);
            });
            
            // Process actions
            $scope.actions.forEach(function (action) {
                action.store_branch_computer = $scope.extractStoreBranchComputer(action);
            });
            
            $scope.isLoggedIn = true;
            $scope.applyFilters();
            $scope.processStationsData();
            $scope.processComputersData();
            
        }).catch(function (error) {
            console.error('Login failed:', error);
            $scope.loading = false;
            $scope.isLoggedIn = false;
            
            // Handle different types of errors
            if (error.status === 401) {
                alert('שם משתמש או סיסמה שגויים. אנא נסה שוב.');
            } else if (error.status === 0) {
                alert('בעיית חיבור לשרת. אנא בדוק את החיבור לאינטרנט.');
            } else {
                alert('שגיאה בהתחברות: ' + (error.data?.message || error.message || 'שגיאה לא ידועה'));
            }
        }).finally(function () {
            $scope.loading = false;
        });
    };

    // Extract Store_Branch_Computer from type field
    $scope.extractStoreBranchComputer = function (item) {
        // For actions, the type field contains the store_branch_computer format
        if (item.type && typeof item.type === 'string' && item.type.includes('_')) {
            return item.type;
        }
        // For leads, we might need to extract from a different field
        if (item.store_branch_computer) {
            return item.store_branch_computer;
        }
        return 'לא זמין';
    };

    // Check Lead Quality - using your existing logic
    $scope.checkLeadQuality = function (lead) {
        let tel = lead.inputs.tel;
        let name = lead.inputs.name;
        let email = lead.inputs.email;

        let checktel = true;
        let checkName = true;
        let chekEmail = true;

        // Check telephone
        if (tel) {
            if (/^[0-9/-]+$/.test(tel)) {
                checktel = tel != undefined && (tel.startsWith("05") || tel.startsWith("02") || tel.startsWith("03") ||
                    tel.startsWith("08") || tel.startsWith("09") || tel.startsWith("04"));
                
                if (tel.includes("-")) {
                    tel = tel.replace("-", "");
                }
                
                if (tel.length === 9 || tel.length === 10 || tel.length === 7) {
                    let counters = new Array(10).fill(0);
                    for (let i = 0; i < tel.length; i++) {
                        counters[tel[i]] = counters[tel[i]] + 1;
                    }
                    
                    if (counters.some(item => item >= 4)) {
                        checktel = false;
                    }
                } else {
                    checktel = false;
                }
            } else {
                checktel = false;
            }
        }

        // Check name
        if (name) {
            checkName = /^[\u0590-\u05FF\s]+$/.test(name) || /^[a-zA-Z\s]+$/.test(name);
            let countSpace = name.split(" ").length - 1;
            let countChar = name.length;
            
            if (countSpace > 3 || countSpace > 3 && countChar > 25 || countChar > 25) {
                checkName = false;
            }
        }

        // Check email
        if (email) {
            chekEmail = email.endsWith(".com") || email.endsWith(".co.il") || 
                       email.endsWith(".CO.IL") || email.endsWith(".COM") || 
                       email.endsWith("bezeqint.net") || email.endsWith("BEZEQINT.NET");
        }

        return checktel && checkName && chekEmail;
    };

    // Apply Filters
    $scope.applyFilters = function () {
        $scope.filteredLeads = $scope.leads.filter(function (lead) {
            // Status filter - show deleted leads only if checkbox is checked
            if (lead.status === 2 && !$scope.showDeletedLeads) {
                return false;
            }
            
            // Date filters
            if ($scope.filters.startDate) {
                let startDate = new Date($scope.filters.startDate);
                let leadDate = new Date(lead.created_at);
                if (leadDate < startDate) return false;
            }
            
            if ($scope.filters.endDate) {
                let endDate = new Date($scope.filters.endDate);
                let leadDate = new Date(lead.created_at);
                if (leadDate > endDate) return false;
            }
            
            return true;
        });

        $scope.filteredActions = $scope.actions.filter(function (action) {
            // Store filter - check if action.type contains the store number
            if ($scope.filters.store && action.type && typeof action.type === 'string') {
                let parts = action.type.split('_');
                if (parts.length >= 1 && parts[0] !== $scope.filters.store) {
                    return false;
                }
            }
            
            // Branch filter
            if ($scope.filters.branch && action.type && typeof action.type === 'string') {
                let parts = action.type.split('_');
                if (parts.length >= 2 && parts[1] !== $scope.filters.branch) {
                    return false;
                }
            }
            
            // Computer filter
            if ($scope.filters.computer && action.type && typeof action.type === 'string') {
                let parts = action.type.split('_');
                if (parts.length >= 3 && parts[2] !== $scope.filters.computer) {
                    return false;
                }
            }
            
            // Action type filter - check if action has a numeric type field
            if ($scope.filters.actionType !== '') {
                let actionTypeValue = action.actionType || action.type;
                // If actionTypeValue is a string with underscores, it's store_branch_computer format
                // In this case, we need to look for the actual action type in a different field
                if (typeof actionTypeValue === 'string' && actionTypeValue.includes('_')) {
                    // For now, skip action type filtering when type field contains store_branch_computer
                    // This will be fixed when we understand the correct data structure
                    return true;
                } else if (actionTypeValue !== parseInt($scope.filters.actionType)) {
                    return false;
                }
            }
            
            // Date filters
            if ($scope.filters.startDate) {
                let startDate = new Date($scope.filters.startDate);
                let actionDate = new Date(action.created_at);
                if (actionDate < startDate) return false;
            }
            
            if ($scope.filters.endDate) {
                let endDate = new Date($scope.filters.endDate);
                let actionDate = new Date(action.created_at);
                if (actionDate > endDate) return false;
            }
            
            return true;
        });
    };

    // Get Unique Values for Filters
    $scope.getUniqueStores = function () {
        let stores = new Set();
        $scope.actions.forEach(function (action) {
            if (action.type && typeof action.type === 'string' && action.type.includes('_')) {
                let parts = action.type.split('_');
                if (parts.length >= 1) {
                    stores.add(parts[0]);
                }
            }
        });
        return Array.from(stores).sort();
    };

    $scope.getUniqueBranches = function () {
        let branches = new Set();
        $scope.actions.forEach(function (action) {
            if (action.type && typeof action.type === 'string' && action.type.includes('_')) {
                let parts = action.type.split('_');
                if (parts.length >= 2) {
                    branches.add(parts[1]);
                }
            }
        });
        return Array.from(branches).sort();
    };

    $scope.getUniqueComputers = function () {
        let computers = new Set();
        $scope.actions.forEach(function (action) {
            if (action.type && typeof action.type === 'string' && action.type.includes('_')) {
                let parts = action.type.split('_');
                if (parts.length >= 3) {
                    computers.add(parts[2]);
                }
            }
        });
        return Array.from(computers).sort();
    };

    // Statistics Functions
    $scope.getTotalLeads = function () {
        return $scope.leads.length;
    };

    $scope.getTotalActions = function () {
        return $scope.actions.length;
    };

    $scope.getActionsByType = function (type) {
        try {
            let counter = 0;
            if (!$scope.actions) return 0;
            
            for (let l of $scope.actions) {
                // Check if action has a separate actionType field, otherwise use type
                let actionType = l.actionType || l.type;
                if (actionType === type) counter++;
            }
            return counter;
        } catch (error) {
            console.error('Error getting actions by type:', error);
            return 0;
        }
    };

    $scope.getDeletedLeads = function () {
        try {
            let counter = 0;
            if (!$scope.leads) return 0;
            
            for (let l of $scope.leads) {
                if (l.status === 2) counter++;
            }
            return counter;
        } catch (error) {
            console.error('Error getting deleted leads:', error);
            return 0;
        }
    };

    // Status Functions
    $scope.getStatusText = function (status) {
        switch (status) {
            case 0: return 'פעיל';
            case 1: return 'טופל';
            case 2: return 'מחוק';
            default: return 'לא ידוע';
        }
    };

    $scope.getStatusBadgeClass = function (status) {
        switch (status) {
            case 0: return 'badge-active';
            case 1: return 'badge-processed';
            case 2: return 'badge-deleted';
            default: return 'badge-secondary';
        }
    };

    $scope.getActionTypeText = function (type) {
        switch (type) {
            case 0: return 'פרסום עלה';
            case 1: return 'לחצו לפרטים';
            case 2: return 'תזוזת עכבר';
            case 3: return 'הזנת פרטים';
            case 4: return 'טעינה';
            default: return 'לא ידוע';
        }
    };

    $scope.getActionTypeBadgeClass = function (type) {
        switch (type) {
            case 0: return 'badge-ad';
            case 1: return 'badge-click';
            case 2: return 'badge-mouse';
            case 3: return 'badge-input';
            case 4: return 'badge-load';
            default: return 'badge-secondary';
        }
    };

    // Lead Status Management - using your existing method - Updated to use CORS Proxy
    $scope.setLeadStatus = function (lead, newStatus) {
        $http.post('https://corsproxy.io/?' + encodeURIComponent('https://ads.safer.link/advertiser/setLeadStatus'), { 
            leadId: lead.id, 
            newStatus, 
            userName: $scope.credentials.userName, 
            password: $scope.credentials.password 
        }).then(function (response) {
            lead.status = newStatus;
            $scope.applyFilters();
        }).catch(function (error) {
            console.error('Error setting lead status:', error);
            alert('שגיאה בעדכון סטטוס הליד: ' + (error.data?.message || error.message || 'שגיאה לא ידועה'));
        });
    };

    // Clear all filters
    $scope.clearFilters = function () {
        $scope.filters = {
            store: '',
            branch: '',
            computer: '',
            actionType: '',
            startDate: '',
            endDate: ''
        };
        $scope.applyFilters();
    };

    // Export filtered data to CSV
    $scope.exportData = function () {
        try {
            let csvContent = '';
        
        // Export leads
        csvContent += 'לידים\n';
        csvContent += 'תאריך,מזהה,איכות,סטטוס\n';
        $scope.filteredLeads.forEach(function (lead) {
            csvContent += `${lead.created_at},${lead.id},${lead.quality ? 'איכותי' : 'לא איכותי'},${$scope.getStatusText(lead.status)}\n`;
        });
        
        csvContent += '\nפעולות\n';
        csvContent += 'תאריך,סוג,חנות_סניף_מחשב\n';
        $scope.filteredActions.forEach(function (action) {
            csvContent += `${action.created_at},${$scope.getActionTypeText(action.type)},${action.store_branch_computer}\n`;
        });
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'leads_actions_data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        } catch (error) {
            console.error('Error exporting data:', error);
            alert('שגיאה בייצוא הנתונים: ' + error.message);
        }
    };

    // Process stations data for the new report
    $scope.processStationsData = function () {
        try {
            const stationsMap = new Map();
        
        // Process actions to group by store_branch_computer
        $scope.actions.forEach(function (action) {
            let storeId, branchId, computerId;
            
            // Parse the type field which contains store_branch_computer format
            if (action.type && typeof action.type === 'string' && action.type.includes('_')) {
                const parts = action.type.split('_');
                if (parts.length >= 3) {
                    storeId = parts[0];
                    branchId = parts[1];
                    computerId = parts[2];
                }
            }
            
            if (storeId && branchId && computerId) {
                const key = `${storeId}_${branchId}_${computerId}`;
                
                if (!stationsMap.has(key)) {
                    stationsMap.set(key, {
                        storeId: storeId,
                        branchId: branchId,
                        computerId: computerId,
                        mouseMoves: 0,
                        loads: 0,
                        keypresses: 0,
                        clicks: 0,
                        leads: 0
                    });
                }
                
                const station = stationsMap.get(key);
                
                // Count actions by type
                switch (action.type) {
                    case 2: // תזוזת עכבר
                        station.mouseMoves++;
                        break;
                    case 4: // טעינה
                        station.loads++;
                        break;
                    case 3: // הזנת פרטים
                        station.keypresses++;
                        break;
                    case 1: // לחיצה על פרטים
                        station.clicks++;
                        break;
                }
            }
        });
        
        // Count leads for each station
        $scope.leads.forEach(function (lead) {
            if (lead.store_branch_computer) {
                const parts = lead.store_branch_computer.split('_');
                if (parts.length >= 3) {
                    const key = `${parts[0]}_${parts[1]}_${parts[2]}`;
                    if (stationsMap.has(key)) {
                        stationsMap.get(key).leads++;
                    }
                }
            }
        });
        
        $scope.stationsData = Array.from(stationsMap.values());
        $scope.filteredStationsData = [...$scope.stationsData];
        $scope.updateStationsStatistics();
        $scope.updateStationsTable();
        } catch (error) {
            console.error('Error processing stations data:', error);
            $scope.stationsData = [];
            $scope.filteredStationsData = [];
        }
    };

    // Update stations statistics
    $scope.updateStationsStatistics = function () {
        try {
            const totalActions = $scope.stationsData.reduce((sum, station) => 
                sum + station.mouseMoves + station.loads + station.keypresses + station.clicks, 0);
        const totalLoads = $scope.stationsData.reduce((sum, station) => sum + station.loads, 0);
        const totalMouseMoves = $scope.stationsData.reduce((sum, station) => sum + station.mouseMoves, 0);
        const totalClicks = $scope.stationsData.reduce((sum, station) => sum + station.clicks, 0);
        const totalKeypresses = $scope.stationsData.reduce((sum, station) => sum + station.keypresses, 0);
        const uniqueStores = new Set($scope.stationsData.map(station => station.storeId)).size;
        
        // Update DOM elements
        $timeout(function () {
            const totalActionsEl = document.getElementById('totalActionsStations');
            const totalLoadsEl = document.getElementById('totalLoadsStations');
            const totalMouseMovesEl = document.getElementById('totalMouseMovesStations');
            const totalClicksEl = document.getElementById('totalClicksStations');
            const totalKeypressesEl = document.getElementById('totalKeypressesStations');
            const uniqueStoresEl = document.getElementById('uniqueStoresStations');
            
            if (totalActionsEl) totalActionsEl.textContent = totalActions;
            if (totalLoadsEl) totalLoadsEl.textContent = totalLoads;
            if (totalMouseMovesEl) totalMouseMovesEl.textContent = totalMouseMoves;
            if (totalClicksEl) totalClicksEl.textContent = totalClicks;
            if (totalKeypressesEl) totalKeypressesEl.textContent = totalKeypresses;
            if (uniqueStoresEl) uniqueStoresEl.textContent = uniqueStores;
        });
        } catch (error) {
            console.error('Error updating stations statistics:', error);
        }
    };

    // Get unique stores for stations filter
    $scope.getUniqueStationStores = function () {
        try {
            if (!$scope.stationsData) return [];
            return Array.from(new Set($scope.stationsData.map(station => station.storeId))).sort();
        } catch (error) {
            console.error('Error getting unique station stores:', error);
            return [];
        }
    };

    // Apply station filters
    $scope.applyStationFilters = function () {
        try {
            const storeFilter = $scope.stationFilters.store || '';
            const startDate = $scope.stationFilters.startDate || '';
            const endDate = $scope.stationFilters.endDate || '';
        
        $scope.filteredStationsData = $scope.stationsData.filter(station => {
            // Store filter
            if (storeFilter && station.storeId !== storeFilter) {
                return false;
            }
            
            // Date filters - we'll need to check if any action from this station falls within the date range
            if (startDate || endDate) {
                const stationActions = $scope.actions.filter(action => {
                    if (action.type && typeof action.type === 'string' && action.type.includes('_')) {
                        const parts = action.type.split('_');
                        if (parts.length >= 3) {
                            return parts[0] === station.storeId && 
                                   parts[1] === station.branchId && 
                                   parts[2] === station.computerId;
                        }
                    }
                    return false;
                });
                
                if (stationActions.length === 0) return false;
                
                if (startDate) {
                    const startDateObj = new Date(startDate);
                    const hasActionAfterStart = stationActions.some(action => 
                        new Date(action.created_at) >= startDateObj);
                    if (!hasActionAfterStart) return false;
                }
                
                if (endDate) {
                    const endDateObj = new Date(endDate);
                    endDateObj.setHours(23, 59, 59);
                    const hasActionBeforeEnd = stationActions.some(action => 
                        new Date(action.created_at) <= endDateObj);
                    if (!hasActionBeforeEnd) return false;
                }
            }
            
            return true;
        });
        
        $scope.updateStationsTable();
        } catch (error) {
            console.error('Error applying station filters:', error);
        }
    };

    // Clear station filters
    $scope.clearStationFilters = function () {
        try {
            $scope.stationFilters = {
                store: '',
                startDate: '',
                endDate: ''
            };
            $scope.filteredStationsData = [...$scope.stationsData];
            $scope.updateStationsTable();
        } catch (error) {
            console.error('Error clearing station filters:', error);
        }
    };

    // Update stations table
    $scope.updateStationsTable = function () {
        try {
            $timeout(function () {
            const tableBody = document.getElementById('stationsTableBody');
            const tableCount = document.getElementById('stationsTableCount');
            
            if (!tableBody) return;
            
            // Clear existing rows
            tableBody.innerHTML = '';
            
            // Update count
            if (tableCount) {
                tableCount.textContent = `${$scope.filteredStationsData.length} עמדות`;
            }
            
            // Add new rows
            $scope.filteredStationsData.forEach(station => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${$scope.getStoreName(station.storeId)}</td>
                    <td>${$scope.getBranchName(station.branchId)}</td>
                    <td><span class="badge badge-info">${station.computerId}</span></td>
                    <td><span class="badge badge-warning">${station.mouseMoves}</span></td>
                    <td><span class="badge badge-success">${station.loads}</span></td>
                    <td><span class="badge badge-danger">${station.keypresses}</span></td>
                    <td><span class="badge badge-info">${station.clicks}</span></td>
                    <td><span class="badge badge-secondary">${station.leads}</span></td>
                `;
                tableBody.appendChild(row);
            });
        });
        } catch (error) {
            console.error('Error updating stations table:', error);
        }
    };

    // Export stations data to CSV
    $scope.exportStationsToCSV = function () {
        try {
            if (!$scope.filteredStationsData || $scope.filteredStationsData.length === 0) {
                alert('אין נתונים לייצוא');
                return;
            }
        
        let csvContent = 'חנות,סניף,מזהה מחשב,תזוזות עכבר,טעינות,הזנות פרטים,לחיצות,מספר לידים\n';
        
        $scope.filteredStationsData.forEach(station => {
            csvContent += `"${$scope.getStoreName(station.storeId)}","${$scope.getBranchName(station.branchId)}","${station.computerId}","${station.mouseMoves}","${station.loads}","${station.keypresses}","${station.clicks}","${station.leads}"\n`;
        });
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `דוח_עמדות_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        } catch (error) {
            console.error('Error exporting stations data:', error);
            alert('שגיאה בייצוא נתוני העמדות: ' + error.message);
        }
    };

    // ===== COMPUTERS STATISTICS FUNCTIONS =====
    
    // Process computers data from actions
    $scope.processComputersData = function () {
        try {
            const computersMap = new Map();
            // Process only loading actions (type 4)
            const loadingActions = $scope.actions.filter(action => {
                let actionType = action.actionType || action.type;
                return actionType === 4 || actionType === '4';
            });
            // Process all mouse move actions (type 2)
            const mouseMoveActions = $scope.actions.filter(action => {
                let actionType = action.actionType || action.type;
                return actionType === 2 || actionType === '2';
            });
            // First, process all loading actions to build the computers map
            loadingActions.forEach(action => {
                // Use action.source which contains the store_branch_computer format
                let storeBranchComputer = action.source || '';
                // Convert to string and remove parentheses if present
                storeBranchComputer = String(storeBranchComputer).replace(/[()]/g, '');
                let parts = storeBranchComputer.split('_');
                if (parts.length >= 3) {
                    let storeId = parts[0];
                    let branchId = parts[1];
                    let computerId = parts[2];
                    let key = `${storeId}_${branchId}_${computerId}`;
                    if (!computersMap.has(key)) {
                        computersMap.set(key, {
                            storeId: storeId,
                            branchId: branchId,
                            computerId: computerId,
                            totalLoadings: 0,
                            mouseMoves: 0,
                            firstDate: null,
                            lastDate: null
                        });
                    }
                    let computer = computersMap.get(key);
                    computer.totalLoadings++;
                    let actionDate = new Date(action.created_at);
                    if (!computer.firstDate || actionDate < new Date(computer.firstDate)) {
                        computer.firstDate = action.created_at;
                    }
                    if (!computer.lastDate || actionDate > new Date(computer.lastDate)) {
                        computer.lastDate = action.created_at;
                    }
                }
            });
            // Now, for each mouse move action, increment mouseMoves for the right computer
            mouseMoveActions.forEach(action => {
                // Use action.source which contains the store_branch_computer format
                let storeBranchComputer = action.source || '';
                // Convert to string and remove parentheses if present
                storeBranchComputer = String(storeBranchComputer).replace(/[()]/g, '');
                let parts = storeBranchComputer.split('_');
                if (parts.length >= 3) {
                    let storeId = parts[0];
                    let branchId = parts[1];
                    let computerId = parts[2];
                    let key = `${storeId}_${branchId}_${computerId}`;
                    if (computersMap.has(key)) {
                        computersMap.get(key).mouseMoves++;
                    }
                }
            });
            $scope.computersData = Array.from(computersMap.values());
            // Apply filters after processing
            $scope.applyComputerFilters();
        } catch (error) {
            console.error('Error processing computers data:', error);
            $scope.computersData = [];
            $scope.filteredComputersData = [];
        }
    };
    
    // Get total computers count
    $scope.getTotalComputers = function () {
        try {
            return $scope.computersData ? $scope.computersData.length : 0;
        } catch (error) {
            console.error('Error getting total computers:', error);
            return 0;
        }
    };
    
    // Get total loadings count
    $scope.getTotalLoadings = function () {
        try {
            return $scope.computersData ? $scope.computersData.reduce((sum, computer) => sum + (computer.totalLoadings || 0), 0) : 0;
        } catch (error) {
            console.error('Error getting total loadings:', error);
            return 0;
        }
    };
    
    // Get total stores count
    $scope.getTotalStores = function () {
        try {
            if (!$scope.computersData) return 0;
            const uniqueStores = new Set($scope.computersData.map(computer => computer.storeId).filter(Boolean));
            return uniqueStores.size;
        } catch (error) {
            console.error('Error getting total stores:', error);
            return 0;
        }
    };
    
    // Get total branches count
    $scope.getTotalBranches = function () {
        try {
            if (!$scope.computersData) return 0;
            const uniqueBranches = new Set($scope.computersData.map(computer => `${computer.storeId}_${computer.branchId}`).filter(Boolean));
            return uniqueBranches.size;
        } catch (error) {
            console.error('Error getting total branches:', error);
            return 0;
        }
    };

    // Sorting functionality
    $scope.sortBy = function(field) {
        if ($scope.sortField === field) {
            $scope.sortReverse = !$scope.sortReverse;
        } else {
            $scope.sortField = field;
            $scope.sortReverse = false;
        }
    };
    
    // Get unique stores from computers data
    $scope.getUniqueComputerStores = function() {
        if (!$scope.computersData) return [];
        const stores = [...new Set($scope.computersData.map(computer => computer.storeId).filter(Boolean))];
        return stores.sort((a, b) => $scope.getStoreName(a).localeCompare($scope.getStoreName(b)));
    };
    
    // Get unique branches from computers data
    $scope.getUniqueComputerBranches = function() {
        if (!$scope.computersData) return [];
        const branches = [...new Set($scope.computersData.map(computer => computer.branchId).filter(Boolean))];
        return branches.sort((a, b) => $scope.getBranchName(a).localeCompare($scope.getBranchName(b)));
    };
    
    // Apply computer filters
    $scope.applyComputerFilters = function() {
        if (!$scope.computersData) {
            $scope.filteredComputersData = [];
            return;
        }
        
        $scope.filteredComputersData = $scope.computersData.filter(function(computer) {
            let matches = true;
            
            if ($scope.computerFilters.store && computer.storeId != $scope.computerFilters.store) {
                matches = false;
            }
            
            if ($scope.computerFilters.branch && computer.branchId != $scope.computerFilters.branch) {
                matches = false;
            }
            
            return matches;
        });
    };
    
    // Clear computer filters
    $scope.clearComputerFilters = function() {
        $scope.computerFilters.store = '';
        $scope.computerFilters.branch = '';
        $scope.applyComputerFilters();
    };
    
    // Check if computer is active (at least 5 loadings)
    $scope.isComputerActive = function(computer) {
        return (computer.totalLoadings >= 5);
    };
    
    // Process stores data for active computers report
    $scope.processStoresData = function() {
        try {
            if (!$scope.computersData || $scope.computersData.length === 0) {
                $scope.storesData = [];
                $scope.filteredStoresData = [];
                return;
            }
            
            const storesMap = new Map();
            
            $scope.computersData.forEach(computer => {
                if (!storesMap.has(computer.storeId)) {
                    storesMap.set(computer.storeId, {
                        storeId: computer.storeId,
                        totalComputers: 0,
                        activeComputers: 0,
                        inactiveComputers: 0,
                        activePercentage: 0
                    });
                }
                
                let store = storesMap.get(computer.storeId);
                store.totalComputers++;
                
                if ($scope.isComputerActive(computer)) {
                    store.activeComputers++;
                } else {
                    store.inactiveComputers++;
                }
            });
            
            // Calculate percentages
            storesMap.forEach(store => {
                store.activePercentage = store.totalComputers > 0 ? 
                    Math.round((store.activeComputers / store.totalComputers) * 100) : 0;
            });
            
            $scope.storesData = Array.from(storesMap.values());
            $scope.applyStoreFilters();
        } catch (error) {
            console.error('Error processing stores data:', error);
            $scope.storesData = [];
            $scope.filteredStoresData = [];
        }
    };
    
    // Get unique stores
    $scope.getUniqueStores = function() {
        if (!$scope.storesData) return [];
        return $scope.storesData.map(store => store.storeId).sort();
    };
    
    // Apply store filters
    $scope.applyStoreFilters = function() {
        if (!$scope.storesData) {
            $scope.filteredStoresData = [];
            return;
        }
        
        $scope.filteredStoresData = $scope.storesData.filter(store => {
            let matches = true;
            
            if ($scope.storeFilter && store.storeId != $scope.storeFilter) {
                matches = false;
            }
            
            if ($scope.computerStatusFilter === 'active' && store.activeComputers === 0) {
                matches = false;
            }
            
            if ($scope.computerStatusFilter === 'inactive' && store.activeComputers > 0) {
                matches = false;
            }
            
            return matches;
        });
    };
    
    // Clear store filters
    $scope.clearStoreFilters = function() {
        $scope.storeFilter = '';
        $scope.computerStatusFilter = '';
        $scope.applyStoreFilters();
    };
    
    // Statistics functions for active computers report
    $scope.getTotalStores = function() {
        return $scope.filteredStoresData ? $scope.filteredStoresData.length : 0;
    };
    
    $scope.getTotalActiveComputers = function() {
        if (!$scope.filteredStoresData) return 0;
        return $scope.filteredStoresData.reduce((sum, store) => sum + store.activeComputers, 0);
    };
    
    $scope.getTotalInactiveComputers = function() {
        if (!$scope.filteredStoresData) return 0;
        return $scope.filteredStoresData.reduce((sum, store) => sum + store.inactiveComputers, 0);
    };
    
    $scope.getAverageActiveComputersPerStore = function() {
        if (!$scope.filteredStoresData || $scope.filteredStoresData.length === 0) return 0;
        const totalActive = $scope.getTotalActiveComputers();
        return Math.round((totalActive / $scope.filteredStoresData.length) * 10) / 10;
    };
    
    $scope.getFilteredStoresCount = function() {
        return $scope.filteredStoresData ? $scope.filteredStoresData.length : 0;
    };
    
    $scope.getFilteredActiveComputersCount = function() {
        return $scope.getTotalActiveComputers();
    };
    
    // Get store computers
    $scope.getStoreComputers = function(storeId) {
        if (!$scope.computersData) return [];
        return $scope.computersData.filter(computer => computer.storeId === storeId);
    };
    
    // Show store details
    $scope.showStoreDetails = function(storeId) {
        const computers = $scope.getStoreComputers(storeId);
        let details = `חנות: ${$scope.getStoreName(storeId)}\n\n`;
        computers.forEach(computer => {
            const status = $scope.isComputerActive(computer) ? 'פעיל' : 'לא פעיל';
            details += `מחשב ${computer.computerId} (${$scope.getBranchName(computer.branchId)}): ${computer.totalLoadings} טעינות - ${status}\n`;
        });
        alert(details);
    };
    
    // Export stores to Excel
    $scope.exportStoresToExcel = function() {
        try {
            const data = $scope.filteredStoresData.map(store => ({
                'חנות': $scope.getStoreName(store.storeId),
                'סך מחשבים': store.totalComputers,
                'מחשבים פעילים': store.activeComputers,
                'מחשבים לא פעילים': store.inactiveComputers,
                'אחוז פעילות': store.activePercentage + '%'
            }));
            
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'דוח מחשבים פעילים');
            
            const fileName = `דוח_מחשבים_פעילים_לפי_חנות_${new Date().toISOString().split('T')[0]}.xlsx`;
            XLSX.writeFile(wb, fileName);
        } catch (error) {
            console.error('Error exporting to Excel:', error);
            alert('שגיאה בייצוא הקובץ');
        }
    };
    
    // Export computers data to CSV
    $scope.exportComputersToCSV = function () {
        try {
            if (!$scope.computersData || $scope.computersData.length === 0) {
                alert('אין נתונים לייצוא');
                return;
            }
        
        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += 'מזהה מחשב,סניף,חנות,סה"כ טעינות,תאריך ראשון,תאריך אחרון\n';
        
        $scope.computersData.forEach(computer => {
            csvContent += `${computer.computerId},"${$scope.getBranchName(computer.branchId)}","${$scope.getStoreName(computer.storeId)}",${computer.totalLoadings},${computer.firstDate},${computer.lastDate}\n`;
        });
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'סטטיסטיקות_מחשבים_' + new Date().toISOString().split('T')[0] + '.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        } catch (error) {
            console.error('Error exporting computers data:', error);
            alert('שגיאה בייצוא הנתונים: ' + error.message);
        }
    };

    // Toggle active computers report
    $scope.showActiveComputersReport = false;
    $scope.toggleActiveComputersReport = function() {
        $scope.showActiveComputersReport = !$scope.showActiveComputersReport;
        if ($scope.showActiveComputersReport) {
            $scope.processStoresData();
        }
    };

    $scope.exportComputersToExcel = function () {
        try {
            if (!$scope.computersData || $scope.computersData.length === 0) {
                alert('אין נתונים לייצוא');
                return;
            }
            // Build worksheet data
            var wsData = [
                ['מזהה מחשב', 'סניף', 'חנות', 'סה"כ טעינות', 'מספר תזוזות עכבר', 'תאריך ראשון', 'תאריך אחרון']
            ];
            $scope.computersData.forEach(function (computer) {
                wsData.push([
                    computer.computerId,
                    $scope.getBranchName(computer.branchId),
                    $scope.getStoreName(computer.storeId),
                    computer.totalLoadings,
                    computer.mouseMoves,
                    computer.firstDate,
                    computer.lastDate
                ]);
            });
            var ws = XLSX.utils.aoa_to_sheet(wsData);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'סטטיסטיקות מחשבים');
            var today = new Date().toISOString().split('T')[0];
            XLSX.writeFile(wb, 'סטטיסטיקות_מחשבים_' + today + '.xlsx');
        } catch (error) {
            console.error('Error exporting computers to Excel:', error);
            alert('שגיאה בייצוא לאקסל: ' + error.message);
        }
    };

    // Initialize the application
    $scope.init();
}); 