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
  };

  const desktopIcons = [
    { id: 'docs', title: 'Мои документы', icon: 'FolderOpen', color: 'text-yellow-400' },
    { id: 'settings', title: 'Настройки', icon: 'Settings', color: 'text-gray-400' },
    { id: 'games', title: 'Игры', icon: 'Gamepad2', color: 'text-red-400' },
  ];

  const getWindowContent = (id: string) => {
    switch(id) {
      case 'docs':
        return (
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <Icon name="FileText" size={32} className="text-blue-500" />
              <div>
                <p className="font-semibold">Документ 1.txt</p>
                <p className="text-xs text-gray-500">Изменён: 23.11.2025</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <Icon name="FileText" size={32} className="text-blue-500" />
              <div>
                <p className="font-semibold">Отчет.doc</p>
                <p className="text-xs text-gray-500">Изменён: 20.11.2025</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="Image" size={32} className="text-purple-500" />
              <div>
                <p className="font-semibold">Фото.jpg</p>
                <p className="text-xs text-gray-500">Изменён: 19.11.2025</p>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <Icon name="Monitor" size={20} />
                <span>Экран</span>
              </div>
              <Icon name="ChevronRight" size={20} />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <Icon name="Volume2" size={20} />
                <span>Звук</span>
              </div>
              <Icon name="ChevronRight" size={20} />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <Icon name="Wifi" size={20} />
                <span>Сеть</span>
              </div>
              <Icon name="ChevronRight" size={20} />
            </div>
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
          </div>
        );
      case 'games':
        return (
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded text-white cursor-pointer hover:scale-105 transition">
              <Icon name="Spade" size={24} />
              <span className="font-semibold">Сапёр</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-400 to-blue-400 rounded text-white cursor-pointer hover:scale-105 transition">
              <Icon name="Heart" size={24} />
              <span className="font-semibold">Косынка</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-400 to-red-400 rounded text-white cursor-pointer hover:scale-105 transition">
              <Icon name="Gamepad2" size={24} />
              <span className="font-semibold">Пинбол</span>
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
            <span className="text-white text-xs font-semibold drop-shadow text-center">
              {icon.title}
            </span>
          </div>
        </div>
      ))}

      {windows.map(window => (
        <div
          key={window.id}
          className="absolute bg-white window-shadow animate-scale-in rounded-t-lg overflow-hidden"
          style={{ 
            top: window.position.y, 
            left: window.position.x,
            width: '400px',
            maxHeight: '500px'
          }}
        >
          <div className="xp-gradient text-white px-2 py-1 flex items-center justify-between cursor-move">
            <div className="flex items-center gap-2">
              <Icon name={window.icon} size={16} />
              <span className="text-sm font-bold">{window.title}</span>
            </div>
            <div className="flex gap-1">
              <button className="w-5 h-5 bg-blue-500 hover:bg-blue-600 rounded-sm flex items-center justify-center text-xs">
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

          <div className="bg-white overflow-y-auto" style={{ maxHeight: '380px' }}>
            {window.content}
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
              className="h-8 px-3 bg-[#1F4FD8] hover:bg-[#2758E0] rounded flex items-center gap-2 text-white text-sm"
            >
              <Icon name={w.icon} size={14} />
              <span>{w.title}</span>
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
                <button className="px-4 py-1 bg-gradient-to-b from-[#FF6B3D] to-[#E8501C] hover:from-[#FF7B4D] hover:to-[#F8601C] text-white rounded flex items-center gap-2 shadow">
                  <Icon name="Power" size={16} />
                  <span className="text-sm font-semibold">Выключение</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;