import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Traductions
const resources = {
    fr: {
        translation: {
            nav: {
                home: "Accueil",
                chat: "Discuter",
                dashboard: "Mon bien-être",
                resources: "Ressources",
                community: "Communauté"
            },
            chat: {
                placeholder: "Écris ton message ici...",
                thinking: "Le bot réfléchit...",
                welcome: "Bonjour, je suis là pour t'écouter et t'aider. Comment te sens-tu aujourd'hui ?",
                send: "Envoyer",
                clear: "Effacer l'historique",
                clear: "Effacer l'historique",
                clearConfirm: "Êtes-vous sûr de vouloir effacer tout l'historique de conversation ?",
                suggestions: {
                    panic: "Je fais une crise d'angoisse",
                    help: "Où trouver de l'aide ?",
                    lonely: "Je me sens seul(e)",
                    mood: "Comment suivre mon humeur ?"
                }
            },
            dashboard: {
                title: "Mon bien-être",
                subtitle: "Suis ton humeur et garde un journal de tes pensées",
                moodToday: "Comment te sens-tu aujourd'hui ?",
                addMood: "Ajouter une entrée",
                journal: "Mon journal",
                newEntry: "Nouvelle entrée",
                mood: "Humeur",
                emotions: "Émotions",
                note: "Note",
                save: "Sauvegarder",
                cancel: "Annuler",
                delete: "Supprimer",
                edit: "Modifier"
            },
            community: {
                title: "Communauté",
                subtitle: "Partage tes pensées de manière anonyme",
                shareThought: "Partager une pensée",
                emotion: "Émotion",
                post: "Publier",
                anonymous: "Anonyme",
                reactions: "Réactions"
            },
            resources: {
                title: "Ressources d'Aide",
                subtitle: "Lignes d'écoute, organisations et ressources pour t'accompagner",
                emergency: "En cas d'urgence",
                search: "Rechercher...",
                all: "Tous",
                visit: "Visiter"
            },
            emotions: {
                triste: "Triste",
                anxieux: "Anxieux",
                espoir: "Espoir",
                fatigue: "Fatigué",
                colere: "En colère",
                joie: "Joyeux",
                neutre: "Neutre",
                calme: "Calme"
            },
            footer: {
                about: "Tsiky",
                aboutDesc: "Une plateforme bienveillante dédiée au soutien psychologique et au bien-être émotionnel. Nous sommes là pour t'accompagner dans tes moments difficiles.",
                emergencies: "Urgences",
                sosAmitie: "SOS Amitié",
                sosAmitieDesc: "09 72 39 40 50 (24h/24)",
                suicideEcoute: "Suicide Écoute",
                suicideEcouteDesc: "01 45 39 40 00",
                filSante: "Fil Santé Jeunes",
                filSanteDesc: "0 800 235 236 (gratuit)",
                quickLinks: "Liens Utiles",
                aboutUs: "À propos de nous",
                howItWorks: "Comment ça marche ?",
                helpCenter: "Centre d'aide",
                blog: "Blog & Articles",
                privacy: "Confidentialité",
                contact: "Contact",
                email: "contact@tsiky.mg",
                location: "Antananarivo, Madagascar",
                followUs: "Suivez-nous",
                disclaimer: "Important : Tsiky est une plateforme de soutien et d'accompagnement, mais ne remplace pas un suivi médical professionnel. En cas d'urgence ou de détresse aiguë, contactez immédiatement les numéros d'urgence ci-dessus ou consultez un professionnel de santé.",
                copyright: "Tsiky. Tous droits réservés.",
                madeWith: "Conçu avec",
                forWellness: "pour votre bien-être mental",
                terms: "Conditions d'utilisation",
                privacyPolicy: "Politique de confidentialité"
            }
        }
    },
    en: {
        translation: {
            nav: {
                home: "Home",
                chat: "Chat",
                dashboard: "My Wellness",
                resources: "Resources",
                community: "Community"
            },
            chat: {
                placeholder: "Write your message here...",
                thinking: "The bot is thinking...",
                welcome: "Hello, I'm here to listen and help. How are you feeling today?",
                send: "Send",
                clear: "Clear history",
                clear: "Clear history",
                clearConfirm: "Are you sure you want to clear all conversation history?",
                suggestions: {
                    panic: "I'm having a panic attack",
                    help: "Where can I find help?",
                    lonely: "I feel lonely",
                    mood: "How to track my mood?"
                }
            },
            dashboard: {
                title: "My Wellness",
                subtitle: "Track your mood and keep a thought journal",
                moodToday: "How are you feeling today?",
                addMood: "Add entry",
                journal: "My Journal",
                newEntry: "New entry",
                mood: "Mood",
                emotions: "Emotions",
                note: "Note",
                save: "Save",
                cancel: "Cancel",
                delete: "Delete",
                edit: "Edit"
            },
            community: {
                title: "Community",
                subtitle: "Share your thoughts anonymously",
                shareThought: "Share a thought",
                emotion: "Emotion",
                post: "Post",
                anonymous: "Anonymous",
                reactions: "Reactions"
            },
            resources: {
                title: "Help Resources",
                subtitle: "Helplines, organizations and resources to support you",
                emergency: "In case of emergency",
                search: "Search...",
                all: "All",
                visit: "Visit"
            },
            emotions: {
                triste: "Sad",
                anxieux: "Anxious",
                espoir: "Hope",
                fatigue: "Tired",
                colere: "Angry",
                joie: "Happy",
                neutre: "Neutral",
                calme: "Calm"
            },
            footer: {
                about: "Tsiky",
                aboutDesc: "A caring platform dedicated to psychological support and emotional well-being. We're here to support you through difficult times.",
                emergencies: "Emergencies",
                sosAmitie: "SOS Amitié",
                sosAmitieDesc: "09 72 39 40 50 (24/7)",
                suicideEcoute: "Suicide Helpline",
                suicideEcouteDesc: "01 45 39 40 00",
                filSante: "Youth Health Line",
                filSanteDesc: "0 800 235 236 (free)",
                quickLinks: "Quick Links",
                aboutUs: "About us",
                howItWorks: "How it works?",
                helpCenter: "Help Center",
                blog: "Blog & Articles",
                privacy: "Privacy",
                contact: "Contact",
                email: "contact@tsiky.mg",
                location: "Antananarivo, Madagascar",
                followUs: "Follow us",
                disclaimer: "Important: Tsiky is a support platform but does not replace professional medical care. In case of emergency or acute distress, immediately contact the emergency numbers above or consult a healthcare professional.",
                copyright: "Tsiky. All rights reserved.",
                madeWith: "Made with",
                forWellness: "for your mental wellness",
                terms: "Terms of Use",
                privacyPolicy: "Privacy Policy"
            }
        }
    },
    es: {
        translation: {
            nav: {
                home: "Inicio",
                chat: "Charlar",
                dashboard: "Mi Bienestar",
                resources: "Recursos",
                community: "Comunidad"
            },
            chat: {
                placeholder: "Escribe tu mensaje aquí...",
                thinking: "El bot está pensando...",
                welcome: "Hola, estoy aquí para escuchar y ayudar. ¿Cómo te sientes hoy?",
                send: "Enviar",
                clear: "Borrar historial",
                clear: "Borrar historial",
                clearConfirm: "¿Estás seguro de que quieres borrar todo el historial de conversación?",
                suggestions: {
                    panic: "Tengo un ataque de pánico",
                    help: "¿Dónde puedo encontrar ayuda?",
                    lonely: "Me siento solo/a",
                    mood: "¿Cómo seguir mi estado de ánimo?"
                }
            },
            dashboard: {
                title: "Mi Bienestar",
                subtitle: "Rastrea tu estado de ánimo y mantén un diario de pensamientos",
                moodToday: "¿Cómo te sientes hoy?",
                addMood: "Añadir entrada",
                journal: "Mi Diario",
                newEntry: "Nueva entrada",
                mood: "Estado de ánimo",
                emotions: "Emociones",
                note: "Nota",
                save: "Guardar",
                cancel: "Cancelar",
                delete: "Eliminar",
                edit: "Editar"
            },
            community: {
                title: "Comunidad",
                subtitle: "Comparte tus pensamientos de forma anónima",
                shareThought: "Compartir un pensamiento",
                emotion: "Emoción",
                post: "Publicar",
                anonymous: "Anónimo",
                reactions: "Reacciones"
            },
            resources: {
                title: "Recursos de Ayuda",
                subtitle: "Líneas de ayuda, organizaciones y recursos para acompañarte",
                emergency: "En caso de emergencia",
                search: "Buscar...",
                all: "Todos",
                visit: "Visitar"
            },
            emotions: {
                triste: "Triste",
                anxieux: "Ansioso",
                espoir: "Esperanza",
                fatigue: "Cansado",
                colere: "Enojado",
                joie: "Feliz",
                neutre: "Neutral",
                calme: "Tranquilo"
            },
            footer: {
                about: "Tsiky",
                aboutDesc: "Una plataforma solidaria dedicada al apoyo psicológico y al bienestar emocional. Estamos aquí para acompañarte en tus momentos difíciles.",
                emergencies: "Emergencias",
                sosAmitie: "SOS Amitié",
                sosAmitieDesc: "09 72 39 40 50 (24/7)",
                suicideEcoute: "Línea de Prevención",
                suicideEcouteDesc: "01 45 39 40 00",
                filSante: "Línea de Salud Juvenil",
                filSanteDesc: "0 800 235 236 (gratis)",
                quickLinks: "Enlaces Útiles",
                aboutUs: "Sobre nosotros",
                howItWorks: "¿Cómo funciona?",
                helpCenter: "Centro de ayuda",
                blog: "Blog y Artículos",
                privacy: "Privacidad",
                contact: "Contacto",
                email: "contact@tsiky.mg",
                location: "Antananarivo, Madagascar",
                followUs: "Síguenos",
                disclaimer: "Importante: Tsiky es una plataforma de apoyo pero no reemplaza la atención médica profesional. En caso de emergencia o angustia aguda, contacta inmediatamente los números de emergencia arriba o consulta a un profesional de salud.",
                copyright: "Tsiky. Todos los derechos reservados.",
                madeWith: "Hecho con",
                forWellness: "para tu bienestar mental",
                terms: "Términos de uso",
                privacyPolicy: "Política de privacidad"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'fr',
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage']
        },
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
