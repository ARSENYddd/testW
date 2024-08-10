import React from 'react';

const data = [
  { 
    id: 1, 
    title: 'Структура системы', 
    content: (
      <>
        <p className="mb-4">
          Информационную систему обеспечения внутренней деятельности Публично-правовой компании 
          «Российский экологический оператор» (ИС ОВД) можно условно разделить на:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Портальное решение, автоматизирующее бизнес-процессы компании.</li>
          <li>Классический документооборот (СЭД).</li>
        </ul>
        <p className="mb-4">
          Всего в системе насчитывается одиннадцать самостоятельных модулей.
        </p>
      </>
    ), 
    bgColor: 'bg-blue-500', 
    textColor: 'text-black', 
    imageUrl: 'https://static.tildacdn.com/tild6333-6564-4562-a133-306531656439/noroot.png'
  },
  { 
    id: 2, 
    title: 'Корпоративные документы', 
    content: (
      <>
        <p className="mb-4">
        В представлении содержатся все карточки корпоративных документов, созданные в системе.
        </p>
        <p className="mb-4">
        Группировка настроена по значению поля "Тип корпоративного документа».
        </p>
      </>
    ), 
    bgColor: 'bg-gray-800', 
    textColor: 'text-white', 
    imageUrl: 'https://static.tildacdn.com/tild6163-6433-4536-b964-396266306632/55_--.png'
  },
  { 
    id: 3, 
    title: 'Новости', 
    content: (
      <>
        <p className="mb-4">
        Публикация новости зависит от значения в поле «Опубликовать (дата публикаци)». При отсутствии значения новость попадет в папку черновики и не будет опубликована.
        </p>
        
      </>
    ), 
    bgColor: 'bg-gray-800', 
    textColor: 'text-white', 
    imageUrl: 'https://static.tildacdn.com/tild3534-3761-4430-b131-646237313466/57_-.png'
  },
  { 
    id: 4, 
    title: 'Открытая новость с главной страницы', 
    content: (
      <>
        <p className="mb-4">
        Новость на главной странице можно раскрыть двойным кликом по новости левой кнопкой мыши.
       </p>
        
      </>
    ), 
    bgColor: '', 
    textColor: 'text-black', 
    imageUrl: 'https://static.tildacdn.com/tild3133-6434-4739-a632-336166323464/58_----_j.png',
    colSpan: 2  
  },
  { 
    id: 5, 
    title: 'Документооборот', 
    content: (
      <>
        <p className="mb-4">
        Новость на главной странице можно раскрыть двойным кликом по новости левой кнопкой мыши.
       </p>
        
      </>
    ), 
    bgColor: 'bg-gray-800', 
    textColor: 'text-white', 
    imageUrl: 'https://static.tildacdn.com/tild3933-6534-4164-b733-326661343237/2_.png',
    colSpan: 2  
  },
];

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4" style={{ marginTop: '2rem', marginRight: '2rem', marginLeft: '2rem' }}>
      {data.map((block) => (
        <div
          key={block.id}
          className={`flex flex-col justify-center items-center ${block.textColor} text-4xl ${block.bgColor} rounded-lg shadow-lg p-4 ${block.colSpan ? `col-span-${block.colSpan}` : ''}`}
        >
          <div style={{ marginTop: '2rem', marginRight: '2rem', marginLeft: '2rem' }}> {/* Отступы по краям для текста */}
            <h1 className="mb-4">{block.title}</h1>
            <p className="mb-4">{block.content}</p>
          </div>
          <div style={{ marginTop: '2rem', marginRight: '2rem', marginLeft: '2rem', marginBottom: '2rem'}}> {/* Отступы по краям для картинки */}
            <img src={block.imageUrl} alt={block.title} className="max-w-full h-auto" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
