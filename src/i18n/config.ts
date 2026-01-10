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
                community: "Communauté",
                emergency: "Urgence",
                emergencyMode: "Mode Urgence",
                toggleLight: "Activer le mode clair",
                toggleDark: "Activer le mode sombre",
                lightMode: "Mode clair",
                darkMode: "Mode sombre",
                changeLanguage: "Changer de langue"
            },
            hero: {
                title: "Prends ton temps, respire",
                subtitle: "Un espace bienveillant pour t'accompagner dans tes moments difficiles. Discute avec notre assistant, explore des ressources thérapeutiques, ou rejoins notre communauté de soutien.",
                explore: "Explorer",
                chat: "Discuter",
                testimonialsTitle: "Témoignages",
                testimonial1: "Cette plateforme m'a aidé à traverser ma dépression post-études. Les exercices de respiration et le suivi quotidien ont vraiment fait la différence.",
                testimonial2: "J'ai trouvé ici un espace où je peux exprimer mes angoisses sans jugement. Le chatbot est étonnamment réconfortant dans les moments de crise.",
                anonymous_24: "Anonyme, 24 ans",
                anonymous_22: "Anonyme, 22 ans",
                messages: [
                    "Un jour à la fois, tu t'en sortiras.",
                    "Ta valeur ne dépend pas de ta productivité.",
                    "Respire. Tu fais de ton mieux et c'est suffisant.",
                    "Cette émotion est temporaire, pas ta force.",
                    "Tu n'es pas seul(e) dans cette traversée.",
                    "Chaque petit pas compte, même les plus petits.",
                    "Ta présence dans ce monde a de l'importance.",
                    "Sois doux(ce) avec toi-même aujourd'hui.",
                    "Tes sentiments sont valides et légitimes.",
                    "Tu mérites amour et compassion, surtout de toi-même.",
                    "Cette tempête passera, tu es plus fort(e) que tu ne le crois.",
                    "Prends le temps de guérir, il n'y a pas de rush."
                ]
            },
            emergencyMode: {
                title: "Mode Urgence Émotionnelle",
                step1Title: "Comment te sens-tu ?",
                step1Desc: "Tu traverses un moment difficile, mais nous sommes là pour t'aider. Commençons par quelques exercices de respiration pour t'apaiser.",
                dangerWarning: "Si tu es en danger immédiat ou si tu as des pensées suicidaires, appelle immédiatement le numéro d'urgence ci-dessous :",
                suicideNumber: "3114 - Numéro national prévention suicide",
                startBreathing: "Commencer la respiration",
                step2Title: "Exercice de cohérence cardiaque",
                step2Desc: "Suis le mouvement et respire profondément. Inspire pendant que le cercle s'agrandit, et expire pendant qu'il se réduit.",
                startExercise: "Démarrer l'exercice",
                inhaleExhale: "Inspire... Expire...",
                excellent: "Excellent !",
                instruction: "Respire lentement et profondément",
                completed: "Tu as complété l'exercice de respiration",
                continue: "Continuer",
                back: "Retour",
                step3Title: "Comment te sens-tu maintenant ?",
                step3Desc: "Si tu te sens mieux, tu peux fermer cette fenêtre. Si tu as encore besoin d'aide, voici quelques ressources supplémentaires :",
                soothingSoundTitle: "Écouter un son apaisant",
                soothingSoundDesc: "Sons naturels pour calmer ton esprit",
                talkTitle: "Parler à un écoutant",
                talkDesc: "SOS Amitié: 09 72 39 40 50 (24h/24)",
                close: "Fermer"
            },
            chat: {
                placeholder: "Écris ton message ici...",
                thinking: "Le bot réfléchit...",
                welcome: "Bonjour, je suis là pour t'écouter et t'aider. Comment te sens-tu aujourd'hui ?",
                send: "Envoyer",
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
                community: "Community",
                emergency: "Emergency",
                emergencyMode: "Emergency Mode",
                toggleLight: "Switch to light mode",
                toggleDark: "Switch to dark mode",
                lightMode: "Light mode",
                darkMode: "Dark mode",
                changeLanguage: "Change language"
            },
            hero: {
                title: "Take your time, breathe",
                subtitle: "A caring space to support you during difficult times. Chat with our assistant, explore therapeutic resources, or join our support community.",
                explore: "Explore",
                chat: "Chat",
                testimonialsTitle: "Testimonials",
                testimonial1: "This platform helped me get through my post-graduation depression. The breathing exercises and daily tracking really made a difference.",
                testimonial2: "I found a space here where I can express my anxieties without judgment. The chatbot is surprisingly comforting during crisis moments.",
                anonymous_24: "Anonymous, 24 years old",
                anonymous_22: "Anonymous, 22 years old",
                messages: [
                    "One day at a time, you will get through this.",
                    "Your worth does not depend on your productivity.",
                    "Breathe. You are doing your best and that is enough.",
                    "This emotion is temporary, not your strength.",
                    "You are not alone in this journey.",
                    "Every small step counts, even the smallest ones.",
                    "Your presence in this world matters.",
                    "Be gentle with yourself today.",
                    "Your feelings are valid and legitimate.",
                    "You deserve love and compassion, especially from yourself.",
                    "This storm will pass, you are stronger than you think.",
                    "Take time to heal, there is no rush."
                ]
            },
            emergencyMode: {
                title: "Emotional Emergency Mode",
                step1Title: "How are you feeling?",
                step1Desc: "You are going through a difficult time, but we are here to help. Let's start with some breathing exercises to calm you down.",
                dangerWarning: "If you are in immediate danger or having suicidal thoughts, immediately call the emergency number below:",
                suicideNumber: "3114 - National Suicide Prevention Number",
                startBreathing: "Start breathing",
                step2Title: "Cardiac Coherence Exercise",
                step2Desc: "Follow the movement and breathe deeply. Inhale as the circle expands, and exhale as it shrinks.",
                startExercise: "Start exercise",
                inhaleExhale: "Inhale... Exhale...",
                excellent: "Excellent!",
                instruction: "Breathe slowly and deeply",
                completed: "You have completed the breathing exercise",
                continue: "Continue",
                back: "Back",
                step3Title: "How are you feeling now?",
                step3Desc: "If you feel better, you can close this window. If you still need help, here are some additional resources:",
                soothingSoundTitle: "Listen to a soothing sound",
                soothingSoundDesc: "Natural sounds to calm your mind",
                talkTitle: "Talk to a listener",
                talkDesc: "SOS Amitié: 09 72 39 40 50 (24/7)",
                close: "Close"
            },
            chat: {
                placeholder: "Write your message here...",
                thinking: "The bot is thinking...",
                welcome: "Hello, I'm here to listen and help. How are you feeling today?",
                send: "Send",
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
                community: "Comunidad",
                emergency: "Emergencia",
                emergencyMode: "Modo de Emergencia",
                toggleLight: "Cambiar a modo claro",
                toggleDark: "Cambiar a modo oscuro",
                lightMode: "Modo claro",
                darkMode: "Modo oscuro",
                changeLanguage: "Cambiar idioma"
            },
            hero: {
                title: "Tómate tu tiempo, respira",
                subtitle: "Un espacio solidario para acompañarte en tus momentos difíciles. Habla con nuestro asistente, explora recursos terapéuticos o únete a nuestra comunidad de apoyo.",
                explore: "Explorar",
                chat: "Charlar",
                testimonialsTitle: "Testimonios",
                testimonial1: "Esta plataforma me ayudó a superar mi depresión post-graduación. Los ejercicios de respiración y el seguimiento diario realmente marcaron la diferencia.",
                testimonial2: "Encontré aquí un espacio donde puedo expresar mis ansiedades sin juicios. El chatbot es sorprendentemente reconfortante en los momentos de crisis.",
                anonymous_24: "Anónimo, 24 años",
                anonymous_22: "Anónimo, 22 años",
                messages: [
                    "Un día a la vez, saldrás de esto.",
                    "Tu valor no depende de tu productividad.",
                    "Respira. Estás haciendo lo mejor que puedes y es suficiente.",
                    "Esta emoción es temporal, no tu fuerza.",
                    "No estás solo(a) en este viaje.",
                    "Cada pequeño paso cuenta, incluso los más pequeños.",
                    "Tu presencia en este mundo importa.",
                    "Sé amable contigo mismo(a) hoy.",
                    "Tus sentimientos son válidos y legítimos.",
                    "Mereces amor y compasión, especialmente de ti mismo(a).",
                    "Esta tormenta pasará, eres más fuerte de lo que crees.",
                    "Tómate tu tiempo para sanar, no hay prisa."
                ]
            },
            emergencyMode: {
                title: "Modo de Emergencia Emocional",
                step1Title: "¿Cómo te sientes?",
                step1Desc: "Estás pasando por un momento difícil, pero estamos aquí para ayudarte. Empecemos con unos ejercicios de respiración para calmarte.",
                dangerWarning: "Si estás en peligro inmediato o tienes pensamientos suicidas, llama inmediatamente al número de emergencia a continuación:",
                suicideNumber: "3114 - Número nacional de prevención del suicidio",
                startBreathing: "Comenzar respiración",
                step2Title: "Ejercicio de coherencia cardíaca",
                step2Desc: "Sigue el movimiento y respira profundamente. Inhala mientras el círculo se expande y exhala mientras se contrae.",
                startExercise: "Iniciar ejercicio",
                inhaleExhale: "Inhala... Exhala...",
                excellent: "¡Excelente!",
                instruction: "Respira lenta y profundamente",
                completed: "Has completado el ejercicio de respiración",
                continue: "Continuar",
                back: "Atrás",
                step3Title: "¿Cómo te sientes ahora?",
                step3Desc: "Si te sientes mejor, puedes cerrar esta ventana. Si aún necesitas ayuda, aquí hay algunos recursos adicionales:",
                soothingSoundTitle: "Escuchar un sonido relajante",
                soothingSoundDesc: "Sonidos naturales para calmar tu mente",
                talkTitle: "Hablar con un oyente",
                talkDesc: "SOS Amitié: 09 72 39 40 50 (24h/24)",
                close: "Cerrar"
            },
            chat: {
                placeholder: "Escribe tu mensaje aquí...",
                thinking: "El bot está pensando...",
                welcome: "Hola, estoy aquí para escuchar y ayudar. ¿Cómo te sientes hoy?",
                send: "Enviar",
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
