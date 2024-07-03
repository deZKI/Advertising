import {TItem} from "../types/item.type";
import {generateRandomCoordinate} from "./generateRandomCoordinate";
import {generateRandomDistance} from "./generateRandomDistance";
import {generateRandomString} from "./generateRandomString";
import {generateRandomType} from "./generateRandomType";

export const generateRandomItems = ():TItem[] => Array.from(Array(1000).keys()).map(():TItem => {
  return {
    id: generateRandomString(),
    type: generateRandomType(),
    address: "г.Хабаровск, ул.Карла-Маркса, д.24",
    distance: generateRandomDistance(),
    coverage: 5000,
    description: "Этот рекламный щит расположен на одной из самых оживленных улиц города, прямо в центре Хабаровска. Благодаря своему стратегическому расположению, он обеспечивает отличную видимость для пешеходов и водителей.",
    advantages: [
      {
        id: generateRandomString(), 
        description: "Щит расположен на уровне глаз и хорошо освещен в вечернее время."
      },
      {
        id: generateRandomString(), 
        description: "Местные жители, туристы, офисные работники."
      },
      {
        id: generateRandomString(), 
        description: "Возможность аренды на различные сроки."
      },
      {
        id: generateRandomString(), 
        description: "Целевая аудитория: офисные работники."
      },
    ],
    contacts: [
      {
        id: generateRandomString(),
        name: "Телефон",
        description: "74951234567",
      }, 
      {
        id: generateRandomString(),
        name: "E-mail",
        description: "info@adlocator.ru",
      },
    ],
    coordinate: generateRandomCoordinate()
  }
})
