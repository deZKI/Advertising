import React from 'react';
import styles from './panel.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {setPanelIsSwitched} from '../../store/panelIsSwitched/panelIsSwitchedActions';
import {setItemData} from '../../store/itemData/itemDataActions';
import PanelTitle from '../../ui/PanelTitle/PanelTitle';
import {TInitialState} from '../../store/reducer';
import {TItem} from '../../types/item.type';
import CoverageList from '../CoverageList/CoverageList';
import DetailsList from '../DetailsList/DetailsList';

const list: TItem[] = [
  {
    id: "1qa",
    type: "high",
    address: "г.Хабаровск, ул.Карла-Маркса, д.24",
    distance: 1700,
    coverage: 5000,
    description: "Этот рекламный щит расположен на одной из самых оживленных улиц города, прямо в центре Хабаровска. Благодаря своему стратегическому расположению, он обеспечивает отличную видимость для пешеходов и водителей.",
    advantages: [
      {
        id: "100qa", 
        description: "Щит расположен на уровне глаз и хорошо освещен в вечернее время."
      },
      {
        id: "111qa", 
        description: "Местные жители, туристы, офисные работники."
      },
      {
        id: "122qa", 
        description: "Возможность аренды на различные сроки."
      },
      {
        id: "133qa", 
        description: "Целевая аудитория: офисные работники."
      },
    ],
    contacts: [
      {
        id: "",
        name: "Телефон",
        description: "74951234567",
      }, 
      {
        id: "",
        name: "E-mail",
        description: "info@adlocator.ru",
      },
    ]
  },
  {
    id: "2ws",
    type: "high",
    address: "г.Хабаровск, ул.Карла-Маркса, д.24",
    distance: 2900,
    coverage: 5000,
    description: "Этот рекламный щит расположен на одной из самых оживленных улиц города, прямо в центре Хабаровска. Благодаря своему стратегическому расположению, он обеспечивает отличную видимость для пешеходов и водителей.",
    advantages: [
      {
        id: "200ws", 
        description: "Щит расположен на уровне глаз и хорошо освещен в вечернее время."
      },
      {
        id: "211ws", 
        description: "Местные жители, туристы, офисные работники."
      },
      {
        id: "222ws", 
        description: "Возможность аренды на различные сроки."
      },
      {
        id: "233ws", 
        description: "Целевая аудитория: офисные работники."
      },
    ],
    contacts: [
      {
        id: "",
        name: "Телефон",
        description: "74951234567",
      }, 
      {
        id: "",
        name: "E-mail",
        description: "info@adlocator.ru",
      },
    ]
  },
  {
    id: "3ed",
    type: "middle",
    address: "г.Хабаровск, ул.Карла-Маркса, д.24",
    distance: 3500,
    coverage: 5000,
    description: "Этот рекламный щит расположен на одной из самых оживленных улиц города, прямо в центре Хабаровска. Благодаря своему стратегическому расположению, он обеспечивает отличную видимость для пешеходов и водителей.",
    advantages: [
      {
        id: "300ed", 
        description: "Щит расположен на уровне глаз и хорошо освещен в вечернее время."
      },
      {
        id: "311ed", 
        description: "Местные жители, туристы, офисные работники."
      },
      {
        id: "322ed", 
        description: "Возможность аренды на различные сроки."
      },
      {
        id: "333ed", 
        description: "Целевая аудитория: офисные работники."
      },
    ],
    contacts: [
      {
        id: "",
        name: "Телефон",
        description: "74951234567",
      }, 
      {
        id: "",
        name: "E-mail",
        description: "info@adlocator.ru",
      },
    ]
  },
  {
    id: "4rf",
    type: "middle",
    address: "г.Хабаровск, ул.Карла-Маркса, д.24",
    distance: 3600,
    coverage: 5000,
    description: "Этот рекламный щит расположен на одной из самых оживленных улиц города, прямо в центре Хабаровска. Благодаря своему стратегическому расположению, он обеспечивает отличную видимость для пешеходов и водителей.",
    advantages: [
      {
        id: "400rf", 
        description: "Щит расположен на уровне глаз и хорошо освещен в вечернее время."
      },
      {
        id: "411rf", 
        description: "Местные жители, туристы, офисные работники."
      },
      {
        id: "422rf", 
        description: "Возможность аренды на различные сроки."
      },
      {
        id: "433rf", 
        description: "Целевая аудитория: офисные работники."
      },
    ],
    contacts: [
      {
        id: "",
        name: "Телефон",
        description: "74951234567",
      }, 
      {
        id: "",
        name: "E-mail",
        description: "info@adlocator.ru",
      },
    ]
  },
  {
    id: "5tg",
    type: "middle",
    address: "г.Хабаровск, ул.Карла-Маркса, д.24",
    distance: 4000,
    coverage: 5000,
    description: "Этот рекламный щит расположен на одной из самых оживленных улиц города, прямо в центре Хабаровска. Благодаря своему стратегическому расположению, он обеспечивает отличную видимость для пешеходов и водителей.",
    advantages: [
      {
        id: "500tg", 
        description: "Щит расположен на уровне глаз и хорошо освещен в вечернее время."
      },
      {
        id: "511tg", 
        description: "Местные жители, туристы, офисные работники."
      },
      {
        id: "522tg", 
        description: "Возможность аренды на различные сроки."
      },
      {
        id: "533tg", 
        description: "Целевая аудитория: офисные работники."
      },
    ],
    contacts: [
      {
        id: "",
        name: "Телефон",
        description: "74951234567",
      }, 
      {
        id: "",
        name: "E-mail",
        description: "info@adlocator.ru",
      },
    ]
  },
  {
    id: "6yh",
    type: "middle",
    address: "г.Хабаровск, ул.Карла-Маркса, д.24",
    distance: 4500,
    coverage: 5000,
    description: "Этот рекламный щит расположен на одной из самых оживленных улиц города, прямо в центре Хабаровска. Благодаря своему стратегическому расположению, он обеспечивает отличную видимость для пешеходов и водителей.",
    advantages: [
      {
        id: "600yh", 
        description: "Щит расположен на уровне глаз и хорошо освещен в вечернее время."
      },
      {
        id: "611yh", 
        description: "Местные жители, туристы, офисные работники."
      },
      {
        id: "622yh", 
        description: "Возможность аренды на различные сроки."
      },
      {
        id: "633yh", 
        description: "Целевая аудитория: офисные работники."
      },
    ],
    contacts: [
      {
        id: "",
        name: "Телефон",
        description: "74951234567",
      }, 
      {
        id: "",
        name: "E-mail",
        description: "info@adlocator.ru",
      },
    ]
  },
  {
    id: "7uj",
    type: "middle",
    address: "г.Хабаровск, ул.Карла-Маркса, д.24",
    distance: 5100,
    coverage: 5000,
    description: "Этот рекламный щит расположен на одной из самых оживленных улиц города, прямо в центре Хабаровска. Благодаря своему стратегическому расположению, он обеспечивает отличную видимость для пешеходов и водителей.",
    advantages: [
      {
        id: "700uj", 
        description: "Щит расположен на уровне глаз и хорошо освещен в вечернее время."
      },
      {
        id: "711uj", 
        description: "Местные жители, туристы, офисные работники."
      },
      {
        id: "722uj", 
        description: "Возможность аренды на различные сроки."
      },
      {
        id: "733uj", 
        description: "Целевая аудитория: офисные работники."
      },
    ],
    contacts: [
      {
        id: "",
        name: "Телефон",
        description: "74951234567",
      }, 
      {
        id: "",
        name: "E-mail",
        description: "info@adlocator.ru",
      },
    ]
  },
  {
    id: "8ik",
    type: "middle",
    address: "г.Хабаровск, ул.Карла-Маркса, д.24",
    distance: 2900,
    coverage: 5000,
    description: "Этот рекламный щит расположен на одной из самых оживленных улиц города, прямо в центре Хабаровска. Благодаря своему стратегическому расположению, он обеспечивает отличную видимость для пешеходов и водителей.",
    advantages: [
      {
        id: "800ik", 
        description: "Щит расположен на уровне глаз и хорошо освещен в вечернее время."
      },
      {
        id: "811ik", 
        description: "Местные жители, туристы, офисные работники."
      },
      {
        id: "822ik", 
        description: "Возможность аренды на различные сроки."
      },
      {
        id: "833ik", 
        description: "Целевая аудитория: офисные работники."
      },
    ],
    contacts: [
      {
        id: "",
        name: "Телефон",
        description: "74951234567",
      }, 
      {
        id: "",
        name: "E-mail",
        description: "info@adlocator.ru",
      },
    ]
  },
  {
    id: "9ol",
    type: "low",
    address: "г.Хабаровск, ул.Карла-Маркса, д.24",
    distance: 3500,
    coverage: 5000,
    description: "Этот рекламный щит расположен на одной из самых оживленных улиц города, прямо в центре Хабаровска. Благодаря своему стратегическому расположению, он обеспечивает отличную видимость для пешеходов и водителей.",
    advantages: [
      {
        id: "900ol", 
        description: "Щит расположен на уровне глаз и хорошо освещен в вечернее время."
      },
      {
        id: "911ol", 
        description: "Местные жители, туристы, офисные работники."
      },
      {
        id: "922ol", 
        description: "Возможность аренды на различные сроки."
      },
      {
        id: "933ol", 
        description: "Целевая аудитория: офисные работники."
      },
    ],
    contacts: [
      {
        id: "",
        name: "Телефон",
        description: "74951234567",
      }, 
      {
        id: "",
        name: "E-mail",
        description: "info@adlocator.ru",
      },
    ]
  },
  {
    id: "10qa",
    type: "low",
    address: "г.Хабаровск, ул.Карла-Маркса, д.24",
    distance: 3600,
    coverage: 5000,
    description: "Этот рекламный щит расположен на одной из самых оживленных улиц города, прямо в центре Хабаровска. Благодаря своему стратегическому расположению, он обеспечивает отличную видимость для пешеходов и водителей.",
    advantages: [
      {
        id: "1000qa", 
        description: "Щит расположен на уровне глаз и хорошо освещен в вечернее время."
      },
      {
        id: "1111qa", 
        description: "Местные жители, туристы, офисные работники."
      },
      {
        id: "1222qa", 
        description: "Возможность аренды на различные сроки."
      },
      {
        id: "1333qa", 
        description: "Целевая аудитория: офисные работники."
      },
    ],
    contacts: [
      {
        id: "",
        name: "Телефон",
        description: "74951234567",
      }, 
      {
        id: "",
        name: "E-mail",
        description: "info@adlocator.ru",
      },
    ]
  },
  {
    id: "11ws",
    type: "low",
    address: "г.Хабаровск, ул.Карла-Маркса, д.24",
    distance: 400,
    coverage: 5000,
    description: "Этот рекламный щит расположен на одной из самых оживленных улиц города, прямо в центре Хабаровска. Благодаря своему стратегическому расположению, он обеспечивает отличную видимость для пешеходов и водителей.",
    advantages: [
      {
        id: "1100ws", 
        description: "Щит расположен на уровне глаз и хорошо освещен в вечернее время."
      },
      {
        id: "1111ws", 
        description: "Местные жители, туристы, офисные работники."
      },
      {
        id: "1122ws", 
        description: "Возможность аренды на различные сроки."
      },
      {
        id: "1133ws", 
        description: "Целевая аудитория: офисные работники."
      },
    ],
    contacts: [
      {
        id: "",
        name: "Телефон",
        description: "74951234567",
      }, 
      {
        id: "",
        name: "E-mail",
        description: "info@adlocator.ru",
      },
    ]
  },
];

export default function Panel() {
  const panelIsSwitched = useSelector<TInitialState, boolean>(state => state.panelIsSwitched.panelIsSwitched);
  const item = useSelector<TInitialState, TItem>(state => state.itemData.itemData);
  const dispatch = useDispatch();

  function handleCloseClick() {
    dispatch(setPanelIsSwitched(false));
  }

  function handleOpenClick(e: React.MouseEvent<HTMLElement>) {
    const itemID = e.currentTarget.id;
    const item = list.find((item) => item.id === itemID);

    dispatch(setPanelIsSwitched(true));
    dispatch(setItemData(item));
  }

  return (
    <div className={styles.panel}>
      {!panelIsSwitched
        ? <PanelTitle title='Рекламные щиты' subtitle='по охвату' />
        : <PanelTitle 
            title={`Рекламный щит ${item.id}`} 
            closeButton={true} 
            address={item.address}
            onCloseClick={handleCloseClick} 
          /> 
      }
      {!panelIsSwitched
        ? <div className={styles.list}>
            <CoverageList 
              text='Высокий' 
              type='high' 
              list={list.filter((item) => item.type === "high")}
              onOpenClick={handleOpenClick}
            />
            <CoverageList 
              text='Средний' 
              type='middle' 
              list={list.filter((item) => item.type === "middle")}
              onOpenClick={handleOpenClick} 
            />
            <CoverageList 
              text='Низкий' 
              type='low' 
              list={list.filter((item) => item.type === "low")} 
              onOpenClick={handleOpenClick}
            />
          </div>
        : <DetailsList 
            type={item.type}
            coverage={item.coverage}
            description={item.description}
            advantages={item.advantages}
            contacts={item.contacts}
          />
      }
    </div>
  )
}
