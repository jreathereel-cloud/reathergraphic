// Tout le code est dans une fonction pour éviter les conflits de noms
// avec script-responsive.js (qui déclare déjà plusieurs "const").
(function () {

    // Adresse email qui recevra les messages
    const DESTINATAIRE = 'reathergraphiste2006@gmail.com';

    // Numéro WhatsApp (format international, sans + ni espaces)
    const WHATSAPP = '50932208776';

    const form = document.getElementById('contactForm');
    if (!form) return;

    const fields = {
        name:    { input: document.getElementById('name'),    error: document.getElementById('nameError') },
        email:   { input: document.getElementById('email'),   error: document.getElementById('emailError') },
        subject: { input: document.getElementById('subject'), error: document.getElementById('subjectError') },
        message: { input: document.getElementById('message'), error: document.getElementById('messageError') }
    };
    const phone = document.getElementById('phone');
    const service = document.getElementById('service');
    const privacy = document.getElementById('privacy');
    const formMessage = document.getElementById('formMessage');

    // ===== BOUTONS : email + WhatsApp (créés ici, le HTML ne change pas) =====
    const emailBtn = form.querySelector('.submit-btn');
    emailBtn.textContent = '✉️ Envoyer par email';

    const waBtn = document.createElement('button');
    waBtn.type = 'button';
    waBtn.className = 'submit-btn';
    waBtn.textContent = 'Envoyer par WhatsApp';
    waBtn.style.background = '#25D366';
    waBtn.style.marginTop = '12px';
    emailBtn.insertAdjacentElement('afterend', waBtn);

    // ===== OUTILS =====
    function showError(key, text) {
        fields[key].error.textContent = text;
        fields[key].input.style.borderColor = 'red';
    }

    function clearError(key) {
        fields[key].error.textContent = '';
        fields[key].input.style.borderColor = '';
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function setStatus(text, color) {
        formMessage.textContent = text;
        formMessage.style.color = color;
    }

    // Effacer l'erreur dès que l'utilisateur corrige le champ
    Object.keys(fields).forEach(key => {
        fields[key].input.addEventListener('input', () => clearError(key));
    });

    function validate() {
        let valid = true;

        Object.keys(fields).forEach(clearError);
        setStatus('', '');

        if (fields.name.input.value.trim().length < 2) {
            showError('name', 'Veuillez entrer votre nom.');
            valid = false;
        }

        const emailValue = fields.email.input.value.trim();
        if (!emailValue) {
            showError('email', 'Veuillez entrer votre email.');
            valid = false;
        } else if (!isValidEmail(emailValue)) {
            showError('email', 'Adresse email invalide.');
            valid = false;
        }

        if (fields.subject.input.value.trim().length < 3) {
            showError('subject', 'Veuillez entrer un sujet.');
            valid = false;
        }

        if (fields.message.input.value.trim().length < 10) {
            showError('message', 'Votre message est trop court (10 caractères minimum).');
            valid = false;
        }

        if (!privacy.checked) {
            setStatus('Veuillez accepter les conditions de confidentialité.', 'red');
            valid = false;
        }

        return valid;
    }

    function buildMessage() {
        const serviceText = service.value ? service.options[service.selectedIndex].text : 'Non précisé';

        return {
            subject: fields.subject.input.value.trim(),
            body:
                'Nom : ' + fields.name.input.value.trim() + '\n' +
                'Email : ' + fields.email.input.value.trim() + '\n' +
                'Téléphone : ' + (phone.value.trim() || 'Non précisé') + '\n' +
                'Service : ' + serviceText + '\n\n' +
                fields.message.input.value.trim()
        };
    }

    // ===== ENVOI PAR EMAIL (bouton de type submit) =====
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!validate()) return;

        const msg = buildMessage();
        const mailto = 'mailto:' + DESTINATAIRE +
            '?subject=' + encodeURIComponent(msg.subject) +
            '&body=' + encodeURIComponent(msg.body);

        // Ouvre l'application email du visiteur avec le message déjà rempli
        window.location.href = mailto;

        setStatus('Merci ! Votre application email va s\'ouvrir : cliquez sur « Envoyer » pour terminer.', 'green');
        form.reset();
    });

    // ===== ENVOI PAR WHATSAPP =====
    waBtn.addEventListener('click', function () {
        if (!validate()) return;

        const msg = buildMessage();
        const whatsappUrl = 'https://wa.me/' + WHATSAPP +
            '?text=' + encodeURIComponent('*' + msg.subject + '*\n\n' + msg.body);

        const waWindow = window.open(whatsappUrl, '_blank');

        if (waWindow) {
            setStatus('Merci ! WhatsApp va s\'ouvrir : cliquez sur « Envoyer » pour terminer.', 'green');
            form.reset();
        } else {
            setStatus('Le navigateur a bloqué WhatsApp. Autorisez les pop-ups puis réessayez.', 'red');
        }
    });

    console.log('✓ contact-script.js chargé');

})();
