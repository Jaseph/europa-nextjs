"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Calendar, User, ArrowRight, Search, Menu, X, Globe, ExternalLink, ChevronDown } from 'lucide-react';

// RSS'ten gelen bir yazı için arayüz tanımı
interface RSSPost {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  description: string;
  imageUrl?: string;
  language: string;
}

// Arayüz çevirileri için tip tanımı
interface UITranslations {
  [key: string]: string;
}

interface LanguageTranslations {
  [langCode: string]: UITranslations;
}

// Arayüz metinleri için çeviri objesi
// BURAYI DİĞER 8 DİL İÇİN GENİŞLETMEN GEREKECEK

  const uiTexts: LanguageTranslations = {
  tr: {
    blogTitle: "Europa.tips Blog",
    home: "Ana Sayfa",
    discoverTitle: "Europa.tips Keşifler",
    discoverSubtitle: "Avrupa'nın dört bir yanından seyahat notları, ipuçları ve ilham veren hikayeler.",
    searchPlaceholder: "Türkçe yazılarda ara...",
    loadingPosts: "Yazılar yükleniyor...",
    errorLoading: "Bir hata oluştu:",
    tryAgain: "Lütfen daha sonra tekrar deneyin.",
    noPostsFoundSearch: "Aradığınız kriterlere uygun yazı bulunamadı.",
    noPostsFoundLang: "dilinde gösterilecek yazı bulunamadı.",
    noPostsFoundGeneral: "Gösterilecek yazı bulunamadı.",
    tryDifferentSearch: "Farklı bir arama terimi veya dil deneyin.",
    tryDifferentLang: "Başka bir dil seçmeyi deneyebilirsiniz.",
    backButton: "Geri Dön",
    languageLabel: "Dil:",
    viewOriginalPost: "Yazının Tamamını Oku",
    allLanguages: "Tüm Diller",
    footerText: "Jaseph tarafından hazırlandı. Tüm hakları saklıdır.",
    footerInspiration: "Seyahatlerinizde ilham vermek dileğiyle!",
    details: "Detaylar",
    selectLanguageDesktop: "Dil Seçin",
    selectLanguageMobile: "Dil:",
    authorGeneric: "Europa.tips Ekibi"
  },
  en: {
    blogTitle: "Europa.tips Blog",
    home: "Home",
    discoverTitle: "Europa.tips Discoveries",
    discoverSubtitle: "Travel notes, tips, and inspiring stories from all over Europe.",
    searchPlaceholder: "Search in English posts...",
    loadingPosts: "Loading posts...",
    errorLoading: "An error occurred:",
    tryAgain: "Please try again later.",
    noPostsFoundSearch: "No posts matching your criteria were found.",
    noPostsFoundLang: "No posts available in this language.",
    noPostsFoundGeneral: "No posts to display.",
    tryDifferentSearch: "Try a different search term or language.",
    tryDifferentLang: "You can try selecting another language.",
    backButton: "Back",
    languageLabel: "Language:",
    viewOriginalPost: "Read the Full Post",
    allLanguages: "All Languages",
    footerText: "Created by Jaseph. All rights reserved.",
    footerInspiration: "Wishing to inspire your journeys!",
    details: "Details",
    selectLanguageDesktop: "Select Language",
    selectLanguageMobile: "Language:",
    authorGeneric: "Europa.tips Team"
  },
  de: {
    blogTitle: "Europa.tips Blog",
    home: "Startseite",
    discoverTitle: "Europa.tips Entdeckungen",
    discoverSubtitle: "Reisenotizen, Tipps und inspirierende Geschichten aus ganz Europa.",
    searchPlaceholder: "In deutschen Beiträgen suchen...",
    loadingPosts: "Beiträge werden geladen...",
    errorLoading: "Ein Fehler ist aufgetreten:",
    tryAgain: "Bitte versuchen Sie es später noch einmal.",
    noPostsFoundSearch: "Keine Beiträge entsprechend Ihrer Suche gefunden.",
    noPostsFoundLang: "Keine Beiträge in dieser Sprache verfügbar.",
    noPostsFoundGeneral: "Keine Beiträge zum Anzeigen.",
    tryDifferentSearch: "Probieren Sie einen anderen Suchbegriff oder eine andere Sprache.",
    tryDifferentLang: "Sie können auch eine andere Sprache wählen.",
    backButton: "Zurück",
    languageLabel: "Sprache:",
    viewOriginalPost: "Vollständigen Beitrag lesen",
    allLanguages: "Alle Sprachen",
    footerText: "Erstellt von Jaseph. Alle Rechte vorbehalten.",
    footerInspiration: "Wir wünschen inspirierende Reisen!",
    details: "Details",
    selectLanguageDesktop: "Sprache wählen",
    selectLanguageMobile: "Sprache:",
    authorGeneric: "Europa.tips Team"
  },
  fr: {
    blogTitle: "Europa.tips Blog",
    home: "Accueil",
    discoverTitle: "Découvertes Europa.tips",
    discoverSubtitle: "Notes de voyage, astuces et histoires inspirantes de toute l’Europe.",
    searchPlaceholder: "Rechercher dans les articles en français...",
    loadingPosts: "Chargement des articles...",
    errorLoading: "Une erreur s'est produite :",
    tryAgain: "Veuillez réessayer plus tard.",
    noPostsFoundSearch: "Aucun article correspondant à vos critères n’a été trouvé.",
    noPostsFoundLang: "Aucun article disponible dans cette langue.",
    noPostsFoundGeneral: "Aucun article à afficher.",
    tryDifferentSearch: "Essayez un autre mot-clé ou une autre langue.",
    tryDifferentLang: "Vous pouvez essayer de choisir une autre langue.",
    backButton: "Retour",
    languageLabel: "Langue :",
    viewOriginalPost: "Lire l’article complet",
    allLanguages: "Toutes les langues",
    footerText: "Créé par Jaseph. Tous droits réservés.",
    footerInspiration: "Nous espérons vous inspirer lors de vos voyages !",
    details: "Détails",
    selectLanguageDesktop: "Choisir la langue",
    selectLanguageMobile: "Langue :",
    authorGeneric: "Équipe Europa.tips"
  },
  es: {
    blogTitle: "Europa.tips Blog",
    home: "Inicio",
    discoverTitle: "Descubrimientos Europa.tips",
    discoverSubtitle: "Notas de viaje, consejos e historias inspiradoras de toda Europa.",
    searchPlaceholder: "Buscar en publicaciones en español...",
    loadingPosts: "Cargando publicaciones...",
    errorLoading: "Se ha producido un error:",
    tryAgain: "Por favor, inténtelo de nuevo más tarde.",
    noPostsFoundSearch: "No se han encontrado publicaciones que coincidan con su búsqueda.",
    noPostsFoundLang: "No hay publicaciones disponibles en este idioma.",
    noPostsFoundGeneral: "No hay publicaciones para mostrar.",
    tryDifferentSearch: "Prueba con otra palabra clave o idioma.",
    tryDifferentLang: "Puedes probar a seleccionar otro idioma.",
    backButton: "Volver",
    languageLabel: "Idioma:",
    viewOriginalPost: "Leer la publicación completa",
    allLanguages: "Todos los idiomas",
    footerText: "Creado por Jaseph. Todos los derechos reservados.",
    footerInspiration: "¡Esperamos inspirar tus viajes!",
    details: "Detalles",
    selectLanguageDesktop: "Seleccionar idioma",
    selectLanguageMobile: "Idioma:",
    authorGeneric: "Equipo de Europa.tips"
  },
  it: {
    blogTitle: "Europa.tips Blog",
    home: "Home",
    discoverTitle: "Scoperte Europa.tips",
    discoverSubtitle: "Note di viaggio, consigli e storie ispiratrici da tutta Europa.",
    searchPlaceholder: "Cerca nei post in italiano...",
    loadingPosts: "Caricamento dei post...",
    errorLoading: "Si è verificato un errore:",
    tryAgain: "Per favore, riprova più tardi.",
    noPostsFoundSearch: "Nessun post corrispondente ai criteri trovati.",
    noPostsFoundLang: "Nessun post disponibile in questa lingua.",
    noPostsFoundGeneral: "Nessun post da mostrare.",
    tryDifferentSearch: "Prova un’altra parola chiave o lingua.",
    tryDifferentLang: "Puoi provare a selezionare un’altra lingua.",
    backButton: "Indietro",
    languageLabel: "Lingua:",
    viewOriginalPost: "Leggi l’articolo completo",
    allLanguages: "Tutte le lingue",
    footerText: "Creato da Jaseph. Tutti i diritti riservati.",
    footerInspiration: "Ti auguriamo viaggi ispiratori!",
    details: "Dettagli",
    selectLanguageDesktop: "Seleziona lingua",
    selectLanguageMobile: "Lingua:",
    authorGeneric: "Team Europa.tips"
  },
  nl: {
    blogTitle: "Europa.tips Blog",
    home: "Home",
    discoverTitle: "Europa.tips Ontdekkingen",
    discoverSubtitle: "Reisnotities, tips en inspirerende verhalen uit heel Europa.",
    searchPlaceholder: "Zoek in Nederlandse berichten...",
    loadingPosts: "Berichten worden geladen...",
    errorLoading: "Er is een fout opgetreden:",
    tryAgain: "Probeer het later opnieuw.",
    noPostsFoundSearch: "Geen berichten gevonden die aan uw criteria voldoen.",
    noPostsFoundLang: "Geen berichten beschikbaar in deze taal.",
    noPostsFoundGeneral: "Geen berichten om te tonen.",
    tryDifferentSearch: "Probeer een andere zoekterm of taal.",
    tryDifferentLang: "U kunt proberen een andere taal te kiezen.",
    backButton: "Terug",
    languageLabel: "Taal:",
    viewOriginalPost: "Lees het volledige bericht",
    allLanguages: "Alle talen",
    footerText: "Gemaakt door Jaseph. Alle rechten voorbehouden.",
    footerInspiration: "Wij hopen u te inspireren voor uw reizen!",
    details: "Details",
    selectLanguageDesktop: "Selecteer taal",
    selectLanguageMobile: "Taal:",
    authorGeneric: "Europa.tips Team"
  },
  pt: {
    blogTitle: "Europa.tips Blog",
    home: "Início",
    discoverTitle: "Descobertas Europa.tips",
    discoverSubtitle: "Notas de viagem, dicas e histórias inspiradoras de toda a Europa.",
    searchPlaceholder: "Pesquisar nas publicações em português...",
    loadingPosts: "Carregando publicações...",
    errorLoading: "Ocorreu um erro:",
    tryAgain: "Por favor, tente novamente mais tarde.",
    noPostsFoundSearch: "Nenhuma publicação correspondente aos seus critérios foi encontrada.",
    noPostsFoundLang: "Nenhuma publicação disponível neste idioma.",
    noPostsFoundGeneral: "Nenhuma publicação para mostrar.",
    tryDifferentSearch: "Tente outro termo de pesquisa ou idioma.",
    tryDifferentLang: "Você pode tentar selecionar outro idioma.",
    backButton: "Voltar",
    languageLabel: "Idioma:",
    viewOriginalPost: "Ler a publicação completa",
    allLanguages: "Todos os idiomas",
    footerText: "Criado por Jaseph. Todos os direitos reservados.",
    footerInspiration: "Desejamos inspirar suas viagens!",
    details: "Detalhes",
    selectLanguageDesktop: "Selecionar idioma",
    selectLanguageMobile: "Idioma:",
    authorGeneric: "Equipe Europa.tips"
  },
  ru: {
    blogTitle: "Europa.tips Блог",
    home: "Главная",
    discoverTitle: "Europa.tips Открытия",
    discoverSubtitle: "Путевые заметки, советы и вдохновляющие истории со всей Европы.",
    searchPlaceholder: "Поиск среди русскоязычных постов...",
    loadingPosts: "Загрузка постов...",
    errorLoading: "Произошла ошибка:",
    tryAgain: "Пожалуйста, попробуйте позже.",
    noPostsFoundSearch: "Не найдено постов, соответствующих вашему запросу.",
    noPostsFoundLang: "Нет постов на этом языке.",
    noPostsFoundGeneral: "Нет постов для отображения.",
    tryDifferentSearch: "Попробуйте другой поисковый запрос или язык.",
    tryDifferentLang: "Вы можете попробовать выбрать другой язык.",
    backButton: "Назад",
    languageLabel: "Язык:",
    viewOriginalPost: "Читать весь пост",
    allLanguages: "Все языки",
    footerText: "Создано Jaseph. Все права защищены.",
    footerInspiration: "Пусть ваши путешествия будут вдохновляющими!",
    details: "Подробнее",
    selectLanguageDesktop: "Выбрать язык",
    selectLanguageMobile: "Язык:",
    authorGeneric: "Команда Europa.tips"
  }
};

 



const BlogTheme = () => {
  const [allPosts, setAllPosts] = useState<RSSPost[]>([]);
  const [postsToDisplay, setPostsToDisplay] = useState<RSSPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState<RSSPost | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('tr');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Çeviri fonksiyonu
  const t = useCallback((key: keyof UITranslations): string => {
    return uiTexts[selectedLanguage]?.[key] || uiTexts['en']?.[key] || key.toString();
  }, [selectedLanguage]);


  const formatDate = (dateString: string): string => {
    if (!dateString) return 'Tarih Bilgisi Yok';
    try {
      const date = new Date(dateString);
      // Seçili dile göre tarih formatlama (opsiyonel, şimdilik tr-TR sabit)
      // const locale = selectedLanguage === 'en' ? 'en-US' : `${selectedLanguage}-${selectedLanguage.toUpperCase()}`;
      return date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) { return dateString; }
  };

  const stripHtml = (html: string): string => {
    if (typeof window === "undefined") return html;
    try {
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || '';
    } catch (e) { return html; }
  };
  
  // Dışarı tıklamayı dinle (dropdown için)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  useEffect(() => {
    const fetchAndParseRSS = async () => {
      setLoading(true); setError(null); setAllPosts([]); setAvailableLanguages([]);
      try {
        const response = await fetch('https://europa.tips/rss.php'); // CORS için /api/rss
        if (!response.ok) throw new Error(`${t('errorLoading')} HTTP Hatası! Durum: ${response.status}`);
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");
        const errorNode = xmlDoc.querySelector("parsererror");
        if (errorNode) throw new Error("XML verisi ayrıştırılamadı. RSS kaynağını kontrol edin.");

        const itemNodes = xmlDoc.querySelectorAll("item");
        const parsedPosts: RSSPost[] = [];
        const languages = new Set<string>();

        itemNodes.forEach((node, index) => {
          const linkElement = node.querySelector("link");
          const link = linkElement?.textContent || '';
          const langMatch = link.match(/europa\.tips\/([a-z]{2}(?:-[a-z]{2})?)\//i);
          const language = langMatch?.[1]?.toLowerCase() || 'unknown';
          if (language !== 'unknown') languages.add(language);
          const enclosureElement = node.querySelector("enclosure");
          const guidElement = node.querySelector("guid");
          parsedPosts.push({
            id: guidElement?.textContent || `${link}-${index}`,
            title: node.querySelector("title")?.textContent || 'Başlık Yok',
            link: link, pubDate: node.querySelector("pubDate")?.textContent || '',
            description: node.querySelector("description")?.textContent || '',
            imageUrl: enclosureElement?.getAttribute('url') || undefined,
            language: language,
          });
        });
        
        setAllPosts(parsedPosts);
        const sortedLanguages = Array.from(languages).sort();
        setAvailableLanguages(sortedLanguages);
        if (sortedLanguages.length > 0 && !sortedLanguages.includes(selectedLanguage)) {
          setSelectedLanguage(sortedLanguages[0]);
        } else if (sortedLanguages.length === 0 && parsedPosts.length > 0) {
          // Eğer hiç dil ayrıştırılamadıysa ama post varsa, varsayılan bir dil ata
           if (!sortedLanguages.includes('tr')) setSelectedLanguage('tr'); // Fallback
        }

      } catch (err: any) {
        console.error('RSS Hata:', err);
        setError(err.message || t('tryAgain'));
      } finally {
        setLoading(false);
      }
    };
    fetchAndParseRSS();
  }, []); // Sadece başlangıçta çalışır. `t` fonksiyonunu bağımlılığa eklemiyoruz çünkü `selectedLanguage` değiştikçe yeniden fetch yapmasını istemiyoruz.

  useEffect(() => {
    let filteredByLang = allPosts;
    if (selectedLanguage && selectedLanguage !== 'all' && availableLanguages.includes(selectedLanguage)) {
      filteredByLang = allPosts.filter(post => post.language === selectedLanguage);
    }

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      setPostsToDisplay(
        filteredByLang.filter(post =>
          post.title.toLowerCase().includes(lowerSearchTerm) ||
          stripHtml(post.description).toLowerCase().includes(lowerSearchTerm)
        )
      );
    } else {
      setPostsToDisplay(filteredByLang);
    }
  }, [allPosts, selectedLanguage, searchTerm, availableLanguages]);


  if (selectedPost) {
    return (
      <div className="min-h-screen bg-white text-gray-800">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button onClick={() => setSelectedPost(null)} className="flex items-center space-x-2 text-gray-500 hover:text-gray-800 transition-colors" aria-label={t('backButton')}>
                <ArrowRight className="w-5 h-5 rotate-180" />
                <span>{t('backButton')}</span>
              </button>
              <a href={`https://europa.tips/${selectedPost.language}/`} className="text-xl font-semibold text-gray-800">
                {t('blogTitle')}
              </a>
            </div>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <article className="bg-white">
            {selectedPost.imageUrl && <img src={selectedPost.imageUrl} alt={selectedPost.title} className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8 shadow-md"/>}
            <div className="mb-6">
                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                    {t('languageLabel')} {selectedPost.language.toUpperCase()}
                </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">{selectedPost.title}</h1>
            <div className="text-sm text-gray-500 mb-8">
              <Calendar className="inline w-4 h-4 mr-1.5 align-text-bottom" />
              <span>{formatDate(selectedPost.pubDate)}</span>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedPost.description }}/>
            <div className="mt-10 pt-6 border-t border-gray-200">
                <a href={selectedPost.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 border border-gray-700 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    {t('viewOriginalPost')}
                    <ExternalLink className="ml-2 -mr-1 h-5 w-5" />
                </a>
            </div>
          </article>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700 selection:bg-gray-300 selection:text-gray-900">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href={`https://europa.tips/${selectedLanguage}/`} className="text-2xl sm:text-3xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
              Europa.tips
            </a>
            <div className="flex items-center">
              <nav className="hidden md:flex items-center space-x-6 mr-4">
                <a href={`https://europa.tips/${selectedLanguage}/`} className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors">{t('home')}</a>
              </nav>
              {/* Özel Dil Seçici - Masaüstü */}
              {availableLanguages.length > 1 && (
                <div ref={langDropdownRef} className="relative hidden md:block">
                  <button
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    aria-haspopup="true"
                    aria-expanded={isLangDropdownOpen}
                  >
                    <Globe className="w-4 h-4 text-gray-500" />
                    <span>{selectedLanguage.toUpperCase()}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isLangDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-20">
                      {availableLanguages.map(lang => (
                        <a
                          key={lang}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedLanguage(lang);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${selectedLanguage === lang ? 'font-semibold bg-gray-100' : ''}`}
                        >
                          {lang.toUpperCase()}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div className="md:hidden ml-2">
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-500 hover:text-gray-800" aria-label="Menü">
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
          {mobileMenuOpen && (
            <nav className="md:hidden border-t border-gray-200 py-3">
              <div className="flex flex-col space-y-2 px-2">
                <a href={`https://europa.tips/${selectedLanguage}/`} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">{t('home')}</a>
                {availableLanguages.length > 1 && (
                  <div className="pt-2 border-t border-gray-100 mt-1">
                    <span className="block px-3 text-xs font-medium text-gray-500 mb-1">{t('selectLanguageMobile')}</span>
                    {availableLanguages.map(lang => (
                       <a
                         key={`mobile-${lang}`}
                         href="#"
                         onClick={(e) => {
                           e.preventDefault();
                           setSelectedLanguage(lang);
                           setMobileMenuOpen(false);
                         }}
                         className={`block w-full px-3 py-2 text-left text-base rounded-md ${selectedLanguage === lang ? 'bg-gray-100 font-semibold text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                       >
                         {lang.toUpperCase()}
                       </a>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">{t('discoverTitle')}</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">{t('discoverSubtitle')}</p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full text-base focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white text-gray-800 placeholder-gray-500"
            />
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {loading && (
          <div className="text-center py-12"><div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-700"></div><p className="mt-4 text-lg text-gray-600">{t('loadingPosts')}</p></div>
        )}
        {error && !loading && (
           <div className="text-center py-12 bg-red-50 text-red-600 p-6 rounded-lg border border-red-200"><h3 className="text-lg font-semibold mb-2">{t('errorLoading')}</h3><p className="text-sm">{error}</p><p className="mt-1 text-sm">{t('tryAgain')}</p></div>
        )}
        {!loading && !error && postsToDisplay.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postsToDisplay.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden cursor-pointer group" onClick={() => setSelectedPost(post)} tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && setSelectedPost(post)}>
                {post.imageUrl && (<div className="aspect-w-16 aspect-h-9 overflow-hidden"><img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/></div>)}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="mb-2"><span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">{post.language.toUpperCase()}</span></div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-3 group-hover:text-gray-600 transition-colors">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{stripHtml(post.description)}</p>
                  <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1.5"><Calendar className="w-3.5 h-3.5" /><span>{formatDate(post.pubDate)}</span></div>
                    <div className="flex items-center text-gray-500 group-hover:text-gray-700 transition-colors"><span>{t('details')}</span><ArrowRight className="ml-1 w-3.5 h-3.5" /></div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        {!loading && !error && postsToDisplay.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600">
              {searchTerm ? t('noPostsFoundSearch') : `${selectedLanguage.toUpperCase()} ${t('noPostsFoundLang')}` }
            </p>
            {searchTerm && <p className="text-sm text-gray-500 mt-2">{t('tryDifferentSearch')}</p>}
            {!searchTerm && <p className="text-sm text-gray-500 mt-2">{t('tryDifferentLang')}</p>}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Europa.tips. {t('footerText')}</p>
            <p className="mt-1">{t('footerInspiration')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogTheme;