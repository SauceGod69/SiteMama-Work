/**
 * WhatsApp Message Templates for Dr. Dumitrescu
 * Cleaned and simplified for patient use
 */

const WhatsAppMessages = {
    phoneNumber: '+40723549253', // Phone number

    // Simplified templates
    templates: {
        general: {
            title: 'Consultație Generală',
            message: `Bună ziua, doamna doctor Dumitrescu!

Aș dori să programez o consultație ginecologică.

Detalii:
- Nume: [Numele meu]
- Vârsta: [Vârsta]
- Perioada preferată: [Ex: următoarele 2 săptămâni]
- Interval orar preferat: [Dimineața/După-amiaza]

Ați putea să-mi confirmați disponibilitatea consultației?

Vă mulțumesc!`
        },

        pregnancy: {
            title: 'Monitorizare Sarcină',
            message: `Bună ziua, doamna doctor Dumitrescu!

Aș dori să fac o programare pentru monitorizarea sarcinii.

Detalii:
- Nume: [Numele meu]
- Vârsta: [Vârsta]
- Săptămâna de sarcină: [Ex: 12 săptămâni]
- Prima vizită la dvs.: [Da/Nu]
- Perioada dorită: [Ex: săptămâna aceasta]

Ați putea să-mi spuneți ce disponibilitate aveți?

Mulțumesc mult!`
        },

        ultrasound: {
            title: 'Ecografie Ginecologică',
            message: `Bună ziua, doamna doctor Dumitrescu!

Aș dori să fac o programare pentru o ecografie ginecologică.

Detalii:
- Nume: [Numele meu]
- Vârsta: [Vârsta]
- Tip ecografie: [Transvaginală/Mamară etc.]
- Motiv: [Control rutină/Simpome specifice]
- Urgență: [Normală/Urgentă]
- Disponibilitate: [Ex: orice zi după ora 14:00]

Când ați avea o oră liberă?

Mulțumesc!`
        },

        followup: {
            title: 'Consultație de Control',
            message: `Bună ziua, doamna doctor Dumitrescu!

Sunt [Numele meu], pacienta care a venit la dvs. pe [Data consultației].

Aș dori să programez consultația de control recomandată.

Detalii:
- Motiv control: [Ex: verificare analize/evoluție tratament]
- Perioada preferată: [Ex: săptămâna viitoare]

Când aveți disponibilitate?

Vă mulțumesc pentru ajutor!`
        },

        urgent: {
            title: 'Consultație Urgentă',
            message: `Bună ziua, doamna doctor Dumitrescu!

Îmi cer scuze că vă contactez pentru o situație urgentă.

Simptome:
- [Descriere scurtă]
- De când: [Ex: acum 2 zile]
- Intensitate: [Ușoară/Moderată/Severă]

Detalii personale:
- Nume: [Numele meu]
- Vârsta: [Vârsta]
- Sunt gravidă: [Da/Nu]

Ați putea să mă primiți cât mai curând sau să-mi oferiți un sfat?

Mulțumesc mult!`
        },

        consultation_info: {
            title: 'Informații Servicii',
            message: `Bună ziua, doamna doctor Dumitrescu!

Aș dori câteva informații despre serviciile dvs.

Sunt interesată de:
- [Consultație rutină/Monitorizare sarcină/Ecografie]

Detalii:
- Nume: [Numele meu]
- Vârsta: [Vârsta]
- Prima vizită la dvs.: [Da/Nu]

Ați putea să-mi spuneți:
- Programul de consultații
- Dacă acceptați asigurări
- Durata medie a consultației

Vă mulțumesc mult!`
        }
    },

    // Generate WhatsApp URL
    generateWhatsAppURL: function(message) {
        const cleanMessage = message.trim();
        const encodedMessage = encodeURIComponent(cleanMessage);
        const baseURL = `https://wa.me/${this.phoneNumber.replace('+', '')}`;
        return `${baseURL}?text=${encodedMessage}`;
    },

    // Open WhatsApp with chosen template
    openWhatsApp: function(templateKey = 'general', customData = {}) {
        let message = this.templates[templateKey]?.message || this.templates.general.message;

        // Replace placeholders if provided
        if (customData) {
            Object.keys(customData).forEach(key => {
                const placeholder = `[${key}]`;
                message = message.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), customData[key]);
            });
        }

        const whatsappURL = this.generateWhatsAppURL(message);

        if (this.isMobile()) {
            try {
                window.location.href = whatsappURL;
            } catch (error) {
                window.open(whatsappURL, '_blank', 'noopener,noreferrer');
            }
        } else {
            window.open(whatsappURL, '_blank', 'noopener,noreferrer');
        }
    },

    // Mobile detection
    isMobile: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               (typeof window.orientation !== "undefined") ||
               window.innerWidth <= 768;
    },

    // Get template message
    getTemplate: function(templateKey) {
        return this.templates[templateKey]?.message || this.templates.general.message;
    },

    // Get template title
    getTemplateTitle: function(templateKey) {
        return this.templates[templateKey]?.title || this.templates.general.title;
    },

    // Get all templates
    getAllTemplates: function() {
        const result = {};
        Object.keys(this.templates).forEach(key => {
            result[key] = {
                title: this.templates[key].title,
                message: this.templates[key].message
            };
        });
        return result;
    },

    // Validate message before sending
    validateMessage: function(message) {
        const trimmedMessage = message.trim();

        if (!trimmedMessage) {
            return { valid: false, error: 'Mesajul nu poate fi gol.' };
        }

        if (trimmedMessage.length < 10) {
            return { valid: false, error: 'Mesajul este prea scurt. Adaugă mai multe detalii.' };
        }

        const placeholderPattern = /\[.*?\]/g;
        const placeholders = trimmedMessage.match(placeholderPattern);

        if (placeholders && placeholders.length > 0) {
            return {
                valid: false,
                error: 'Te rog să completezi toate câmpurile din paranteze.',
                placeholders: placeholders
            };
        }

        return { valid: true, message: trimmedMessage };
    },

    // Auto-fill placeholders with defaults
    autoFillPlaceholders: function(message) {
        const now = new Date();
        const currentDate = now.toLocaleDateString('ro-RO');

        return message
            .replace(/\[Data consultației\]/g, currentDate)
            .replace(/\[Ex: următoarele 2 săptămâni\]/g, 'următoarele 2 săptămâni')
            .replace(/\[Dimineața\/După-amiaza\]/g, 'după-amiaza')
            .replace(/\[Ex: săptămâna aceasta\]/g, 'săptămâna aceasta')
            .replace(/\[Normală\/Urgentă\]/g, 'Normală')
            .replace(/\[Da\/Nu\]/g, 'Nu');
    }
};

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WhatsAppMessages;
}

// Make available globally
window.WhatsAppMessages = WhatsAppMessages;

// Mobile enhancements
document.addEventListener('DOMContentLoaded', function() {
    if ('vibrate' in navigator) {
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn-modal-primary') || e.target.closest('.btn-modal-primary')) {
                navigator.vibrate(50);
            }
        });
    }

    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.addEventListener('touchstart', function() {}, { passive: true });
    }

    if (window.matchMedia('(display-mode: standalone)').matches) {
        document.body.classList.add('pwa-mode');
    }
});
