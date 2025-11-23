import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface WindowProps {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  content: React.ReactNode;
  position: { x: number; y: number };
}

const Index = () => {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [windows, setWindows] = useState<WindowProps[]>([]);
  const [time, setTime] = useState(new Date());
  const [currentView, setCurrentView] = useState<{[key: string]: string}>({});

  useState(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  });

  const openWindow = (id: string, title: string, icon: string, content: React.ReactNode) => {
    if (windows.find(w => w.id === id)) {
      return;
    }
    setWindows([...windows, {
      id,
      title,
      icon,
      isOpen: true,
      content,
      position: { x: 100 + windows.length * 30, y: 80 + windows.length * 30 }
    }]);
    setStartMenuOpen(false);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
    const newViews = {...currentView};
    delete newViews[id];
    setCurrentView(newViews);
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows.map(w => w.id === id ? {...w, isOpen: false} : w));
  };

  const restoreWindow = (id: string) => {
    setWindows(windows.map(w => w.id === id ? {...w, isOpen: true} : w));
  };

  const changeView = (windowId: string, view: string) => {
    setCurrentView({...currentView, [windowId]: view});
  };

  const [showShutdown, setShowShutdown] = useState(false);

  const desktopIcons = [
    { id: 'mycomputer', title: 'Мой компьютер', icon: 'HardDrive', color: 'text-blue-400' },
    { id: 'docs', title: 'Мои документы', icon: 'FolderOpen', color: 'text-yellow-400' },
    { id: 'trash', title: 'Корзина', icon: 'Trash2', color: 'text-gray-400' },
    { id: 'games', title: 'Игры', icon: 'Gamepad2', color: 'text-red-400' },
  ];

  const getWindowContent = (id: string) => {
    const view = currentView[id] || 'main';

    switch(id) {
      case 'mycomputer':
        return (
          <div className="p-4">
            <div className="space-y-2">
              <button 
                onClick={() => changeView(id, 'diskC')}
                className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-blue-100 rounded transition"
              >
                <Icon name="HardDrive" size={32} className="text-blue-600" />
                <div className="text-left">
                  <p className="font-semibold">Локальный диск (C:)</p>
                  <p className="text-xs text-gray-500">256 ГБ свободно из 500 ГБ</p>
                </div>
              </button>

              <button 
                onClick={() => changeView(id, 'diskD')}
                className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-blue-100 rounded transition"
              >
                <Icon name="HardDrive" size={32} className="text-green-600" />
                <div className="text-left">
                  <p className="font-semibold">Локальный диск (D:)</p>
                  <p className="text-xs text-gray-500">892 ГБ свободно из 1000 ГБ</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-blue-100 rounded transition">
                <Icon name="Disc" size={32} className="text-purple-600" />
                <div className="text-left">
                  <p className="font-semibold">DVD-дисковод (E:)</p>
                  <p className="text-xs text-gray-500">Пусто</p>
                </div>
              </button>
            </div>

            {view === 'diskC' && (
              <div className="mt-4 pt-4 border-t">
                <button 
                  onClick={() => changeView(id, 'main')}
                  className="mb-2 text-blue-600 hover:underline text-sm flex items-center gap-1"
                >
                  <Icon name="ArrowLeft" size={16} />
                  Назад
                </button>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                    <Icon name="Folder" size={24} className="text-yellow-600" />
                    <span className="text-sm">Windows</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                    <Icon name="Folder" size={24} className="text-yellow-600" />
                    <span className="text-sm">Program Files</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                    <Icon name="Folder" size={24} className="text-yellow-600" />
                    <span className="text-sm">Users</span>
                  </div>
                </div>
              </div>
            )}

            {view === 'diskD' && (
              <div className="mt-4 pt-4 border-t">
                <button 
                  onClick={() => changeView(id, 'main')}
                  className="mb-2 text-blue-600 hover:underline text-sm flex items-center gap-1"
                >
                  <Icon name="ArrowLeft" size={16} />
                  Назад
                </button>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                    <Icon name="Folder" size={24} className="text-yellow-600" />
                    <span className="text-sm">Игры</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                    <Icon name="Folder" size={24} className="text-yellow-600" />
                    <span className="text-sm">Фильмы</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                    <Icon name="Folder" size={24} className="text-yellow-600" />
                    <span className="text-sm">Музыка</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'docs':
        if (view === 'doc1') {
          return (
            <div className="p-4">
              <button 
                onClick={() => changeView(id, 'main')}
                className="mb-3 text-blue-600 hover:underline text-sm flex items-center gap-1"
              >
                <Icon name="ArrowLeft" size={16} />
                Назад
              </button>
              <div className="bg-white border p-4 rounded">
                <h3 className="font-bold mb-2">Документ 1.txt</h3>
                <p className="text-sm text-gray-700">Это содержимое текстового документа. Здесь может быть важная информация или заметки пользователя.</p>
              </div>
            </div>
          );
        }

        if (view === 'report') {
          return (
            <div className="p-4">
              <button 
                onClick={() => changeView(id, 'main')}
                className="mb-3 text-blue-600 hover:underline text-sm flex items-center gap-1"
              >
                <Icon name="ArrowLeft" size={16} />
                Назад
              </button>
              <div className="bg-white border p-4 rounded">
                <h3 className="font-bold mb-2">Отчет.doc</h3>
                <p className="text-sm text-gray-700 mb-2">Ежемесячный отчёт по проекту</p>
                <div className="text-xs space-y-1 text-gray-600">
                  <p>• Выполнено задач: 45</p>
                  <p>• В процессе: 12</p>
                  <p>• Осталось: 23</p>
                </div>
              </div>
            </div>
          );
        }

        if (view === 'photo') {
          return (
            <div className="p-4">
              <button 
                onClick={() => changeView(id, 'main')}
                className="mb-3 text-blue-600 hover:underline text-sm flex items-center gap-1"
              >
                <Icon name="ArrowLeft" size={16} />
                Назад
              </button>
              <div className="bg-gray-100 p-4 rounded flex items-center justify-center h-64">
                <div className="text-center">
                  <Icon name="Image" size={64} className="text-purple-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Фото.jpg</p>
                  <p className="text-xs text-gray-500">1920x1080</p>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="p-4">
            <button 
              onClick={() => changeView(id, 'doc1')}
              className="w-full flex items-center gap-3 mb-3 p-2 hover:bg-blue-50 rounded transition"
            >
              <Icon name="FileText" size={32} className="text-blue-500" />
              <div className="text-left">
                <p className="font-semibold">Документ 1.txt</p>
                <p className="text-xs text-gray-500">Изменён: 23.11.2025</p>
              </div>
            </button>

            <button 
              onClick={() => changeView(id, 'report')}
              className="w-full flex items-center gap-3 mb-3 p-2 hover:bg-blue-50 rounded transition"
            >
              <Icon name="FileText" size={32} className="text-blue-500" />
              <div className="text-left">
                <p className="font-semibold">Отчет.doc</p>
                <p className="text-xs text-gray-500">Изменён: 20.11.2025</p>
              </div>
            </button>

            <button 
              onClick={() => changeView(id, 'photo')}
              className="w-full flex items-center gap-3 p-2 hover:bg-blue-50 rounded transition"
            >
              <Icon name="Image" size={32} className="text-purple-500" />
              <div className="text-left">
                <p className="font-semibold">Фото.jpg</p>
                <p className="text-xs text-gray-500">Изменён: 19.11.2025</p>
              </div>
            </button>
          </div>
        );

      case 'settings':
        return (
          <div className="p-4 space-y-4">
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-blue-50 rounded transition">
              <div className="flex items-center gap-2">
                <Icon name="Monitor" size={20} />
                <span>Экран</span>
              </div>
              <Icon name="ChevronRight" size={20} />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-blue-50 rounded transition">
              <div className="flex items-center gap-2">
                <Icon name="Volume2" size={20} />
                <span>Звук</span>
              </div>
              <Icon name="ChevronRight" size={20} />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-blue-50 rounded transition">
              <div className="flex items-center gap-2">
                <Icon name="Wifi" size={20} />
                <span>Сеть</span>
              </div>
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        );

      case 'about':
        return (
          <div className="p-6 text-center">
            <div className="mb-4">
              <img 
                src="https://cdn.poehali.dev/files/73ba60c4-538e-412e-b356-8c1ab90257a7.jpg" 
                alt="Windows XP" 
                className="mx-auto w-48 rounded"
              />
            </div>
            <h2 className="text-xl font-bold mb-2">Microsoft Windows XP</h2>
            <p className="text-sm text-gray-600 mb-4">Professional</p>
            <div className="text-left space-y-2 text-sm">
              <p>Версия 2002</p>
              <p>Service Pack 3</p>
              <p className="border-t pt-2 mt-2">Система: Intel Core i7</p>
              <p>ОЗУ: 4.00 ГБ</p>
            </div>
            <button 
              onClick={() => closeWindow(id)}
              className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              ОК
            </button>
          </div>
        );

      case 'games':
        if (view === 'minesweeper') {
          return (
            <div className="p-4">
              <button 
                onClick={() => changeView(id, 'main')}
                className="mb-3 text-blue-600 hover:underline text-sm flex items-center gap-1"
              >
                <Icon name="ArrowLeft" size={16} />
                Назад к играм
              </button>
              <div className="bg-gray-200 p-4 rounded">
                <div className="grid grid-cols-8 gap-1 mb-3">
                  {Array.from({length: 64}).map((_, i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 bg-gray-300 hover:bg-gray-400 border border-gray-400 cursor-pointer flex items-center justify-center text-xs font-bold"
                    >
                      {Math.random() > 0.8 ? '💣' : ''}
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold">Сапёр - Новая игра</p>
                </div>
              </div>
            </div>
          );
        }

        if (view === 'solitaire') {
          return (
            <div className="p-4">
              <button 
                onClick={() => changeView(id, 'main')}
                className="mb-3 text-blue-600 hover:underline text-sm flex items-center gap-1"
              >
                <Icon name="ArrowLeft" size={16} />
                Назад к играм
              </button>
              <div className="bg-green-700 p-4 rounded h-64 flex items-center justify-center">
                <div className="grid grid-cols-7 gap-2">
                  {['♠', '♥', '♦', '♣', '♠', '♥', '♦'].map((suit, i) => (
                    <div key={i} className="w-12 h-16 bg-white rounded shadow-md flex items-center justify-center text-2xl">
                      {suit}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        if (view === 'pinball') {
          return (
            <div className="p-4">
              <button 
                onClick={() => changeView(id, 'main')}
                className="mb-3 text-blue-600 hover:underline text-sm flex items-center gap-1"
              >
                <Icon name="ArrowLeft" size={16} />
                Назад к играм
              </button>
              <div className="bg-gradient-to-b from-blue-900 to-purple-900 p-4 rounded h-64 flex items-center justify-center">
                <div className="text-center text-white">
                  <Icon name="Gamepad2" size={64} className="mx-auto mb-2" />
                  <p className="font-bold text-xl">3D Pinball</p>
                  <p className="text-sm">Space Cadet</p>
                  <button className="mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded font-semibold">
                    Начать игру
                  </button>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="p-4 space-y-3">
            <button 
              onClick={() => changeView(id, 'minesweeper')}
              className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded text-white cursor-pointer hover:scale-105 transition"
            >
              <Icon name="Bomb" size={24} />
              <span className="font-semibold">Сапёр</span>
            </button>
            <button 
              onClick={() => changeView(id, 'solitaire')}
              className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-green-400 to-blue-400 rounded text-white cursor-pointer hover:scale-105 transition"
            >
              <Icon name="Spade" size={24} />
              <span className="font-semibold">Косынка</span>
            </button>
            <button 
              onClick={() => changeView(id, 'pinball')}
              className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-400 to-red-400 rounded text-white cursor-pointer hover:scale-105 transition"
            >
              <Icon name="Gamepad2" size={24} />
              <span className="font-semibold">3D Пинбол</span>
            </button>
          </div>
        );

      case 'trash':
        return (
          <div className="p-4">
            <div className="text-center py-8">
              <Icon name="Trash2" size={64} className="text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Корзина пуста</p>
            </div>
          </div>
        );

      default:
        return <div className="p-4">Содержимое окна</div>;
    }
  };

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative"
      style={{
        backgroundImage: 'url(https://cdn.poehali.dev/files/04231761-d565-466d-9498-cbe7ec657a08.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      
      {desktopIcons.map((icon, idx) => (
        <div
          key={icon.id}
          className="absolute cursor-pointer hover:bg-blue-400/30 p-2 rounded transition"
          style={{ top: `${80 + idx * 90}px`, left: '20px' }}
          onDoubleClick={() => openWindow(icon.id, icon.title, icon.icon, getWindowContent(icon.id))}
        >
          <div className="flex flex-col items-center gap-1">
            <Icon name={icon.icon} size={48} className={`${icon.color} drop-shadow-lg`} />
            <span className="text-white text-xs font-semibold drop-shadow text-center max-w-[80px]">
              {icon.title}
            </span>
          </div>
        </div>
      ))}

      {windows.filter(w => w.isOpen).map(window => (
        <div
          key={window.id}
          className="absolute bg-white window-shadow animate-scale-in rounded-t-lg overflow-hidden"
          style={{ 
            top: window.position.y, 
            left: window.position.x,
            width: '450px',
            maxHeight: '550px'
          }}
        >
          <div className="xp-gradient text-white px-2 py-1 flex items-center justify-between cursor-move">
            <div className="flex items-center gap-2">
              <Icon name={window.icon} size={16} />
              <span className="text-sm font-bold">{window.title}</span>
            </div>
            <div className="flex gap-1">
              <button 
                onClick={() => minimizeWindow(window.id)}
                className="w-5 h-5 bg-blue-500 hover:bg-blue-600 rounded-sm flex items-center justify-center text-xs"
              >
                _
              </button>
              <button className="w-5 h-5 bg-blue-500 hover:bg-blue-600 rounded-sm flex items-center justify-center text-xs">
                □
              </button>
              <button 
                onClick={() => closeWindow(window.id)}
                className="w-5 h-5 bg-red-500 hover:bg-red-600 rounded-sm flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>
          </div>
          
          <div className="bg-[#ECE9D8] border-t-2 border-white px-2 py-1">
            <div className="flex gap-4 text-xs">
              <span className="hover:text-blue-600 cursor-pointer">Файл</span>
              <span className="hover:text-blue-600 cursor-pointer">Правка</span>
              <span className="hover:text-blue-600 cursor-pointer">Вид</span>
              <span className="hover:text-blue-600 cursor-pointer">Справка</span>
            </div>
          </div>

          <div className="bg-white overflow-y-auto" style={{ maxHeight: '450px' }}>
            {getWindowContent(window.id)}
          </div>
        </div>
      ))}

      <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#245EDC] flex items-center px-1 shadow-lg">
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className="h-8 px-3 bg-gradient-to-b from-[#3AC03F] to-[#2D9932] hover:from-[#45D049] hover:to-[#36A93B] rounded-md flex items-center gap-2 shadow-md transition"
        >
          <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
            <span className="text-[#245EDC] font-bold text-xs">⊞</span>
          </div>
          <span className="text-white font-bold text-sm italic">Пуск</span>
        </button>

        <div className="flex-1 flex gap-1 px-2">
          {windows.map(w => (
            <button
              key={w.id}
              onClick={() => w.isOpen ? minimizeWindow(w.id) : restoreWindow(w.id)}
              className={`h-8 px-3 ${w.isOpen ? 'bg-[#1F4FD8]' : 'bg-[#2758E0]'} hover:bg-[#2758E0] rounded flex items-center gap-2 text-white text-sm transition`}
            >
              <Icon name={w.icon} size={14} />
              <span className="max-w-[120px] truncate">{w.title}</span>
            </button>
          ))}
        </div>

        <div className="h-8 px-3 bg-[#12AEF3] rounded flex items-center gap-2 text-white text-xs">
          <Icon name="Volume2" size={14} />
          <span>{time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {startMenuOpen && (
        <div className="absolute bottom-10 left-0 w-96 bg-white window-shadow rounded-tr-lg overflow-hidden animate-scale-in">
          <div className="flex">
            <div className="w-12 bg-gradient-to-b from-[#245EDC] to-[#1F4FD8] flex items-end pb-2">
              <span className="text-white text-xs font-bold transform -rotate-90 origin-bottom-left ml-6 mb-4 whitespace-nowrap">
                Windows XP
              </span>
            </div>
            
            <div className="flex-1 bg-white">
              <div className="p-2 space-y-1">
                <button
                  onClick={() => openWindow('mycomputer', 'Мой компьютер', 'HardDrive', getWindowContent('mycomputer'))}
                  className="w-full text-left px-3 py-2 hover:bg-blue-500 hover:text-white rounded flex items-center gap-3 transition"
                >
                  <Icon name="HardDrive" size={24} className="text-blue-500" />
                  <span>Мой компьютер</span>
                </button>

                <button
                  onClick={() => openWindow('docs', 'Мои документы', 'FolderOpen', getWindowContent('docs'))}
                  className="w-full text-left px-3 py-2 hover:bg-blue-500 hover:text-white rounded flex items-center gap-3 transition"
                >
                  <Icon name="FolderOpen" size={24} className="text-yellow-500" />
                  <span>Мои документы</span>
                </button>
                
                <button
                  onClick={() => openWindow('settings', 'Настройки', 'Settings', getWindowContent('settings'))}
                  className="w-full text-left px-3 py-2 hover:bg-blue-500 hover:text-white rounded flex items-center gap-3 transition"
                >
                  <Icon name="Settings" size={24} className="text-gray-500" />
                  <span>Панель управления</span>
                </button>

                <button
                  onClick={() => openWindow('games', 'Игры', 'Gamepad2', getWindowContent('games'))}
                  className="w-full text-left px-3 py-2 hover:bg-blue-500 hover:text-white rounded flex items-center gap-3 transition"
                >
                  <Icon name="Gamepad2" size={24} className="text-red-500" />
                  <span>Игры</span>
                </button>

                <div className="border-t my-2"></div>

                <button
                  onClick={() => openWindow('about', 'О системе Windows', 'Info', getWindowContent('about'))}
                  className="w-full text-left px-3 py-2 hover:bg-blue-500 hover:text-white rounded flex items-center gap-3 transition"
                >
                  <Icon name="Info" size={24} className="text-blue-500" />
                  <span>О системе Windows</span>
                </button>
              </div>

              <div className="bg-[#5A8EDF] p-2 flex justify-end">
                <button 
                  onClick={() => setShowShutdown(true)}
                  className="px-4 py-1 bg-gradient-to-b from-[#FF6B3D] to-[#E8501C] hover:from-[#FF7B4D] hover:to-[#F8601C] text-white rounded flex items-center gap-2 shadow"
                >
                  <Icon name="Power" size={16} />
                  <span className="text-sm font-semibold">Выключение</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showShutdown && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 window-shadow">
            <h3 className="text-lg font-bold mb-4 text-center">Выключение Windows</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">Выберите действие:</p>
            <div className="space-y-2">
              <button className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center justify-center gap-2 transition">
                <Icon name="Power" size={20} />
                <span>Выключить компьютер</span>
              </button>
              <button className="w-full p-3 bg-orange-500 hover:bg-orange-600 text-white rounded flex items-center justify-center gap-2 transition">
                <Icon name="RotateCcw" size={20} />
                <span>Перезагрузить</span>
              </button>
              <button 
                onClick={() => setShowShutdown(false)}
                className="w-full p-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded flex items-center justify-center gap-2 transition"
              >
                <span>Отмена</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
