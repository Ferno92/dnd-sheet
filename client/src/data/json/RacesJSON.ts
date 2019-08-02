import SizeEnum from "data/types/SizeEnum";

export default [
  {
    "type": "Umano",
    "name": "Umano",
    "subraces": [],
    "stats": [],
    "abilities": [],
    "special": [],
    "languages": [],
    "size": SizeEnum.Media
  },
  {
    "type": "Nano",
    "name": "Nano",
    "subraces": ["nano_montagne", "nano_colline"],
    "stats": [{ "Cos": 2 }],
    "abilities": [],
    "special": [],
    "languages": [],
    "size": SizeEnum.Media
  }
]
