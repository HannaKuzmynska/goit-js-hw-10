import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');

    if (!form) {
        console.error('Form element not found');
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const delay = parseInt(event.target.elements.delay.value);
        const state = event.target.elements.state.value;

        createPromise(delay, state)
            .then(delay => {
                iziToast.success({
                    title: 'Success',
                    message: `✅ Fulfilled promise in ${delay}ms`,
                });
            })
            .catch(delay => {
                iziToast.error({
                    title: 'Error',
                    message: `❌ Rejected promise in ${delay}ms`,
                });
            })
            .finally(() => {
                // Очищуємо форму після обробки промісу
                form.reset();
            });
    });

    function createPromise(delay, state) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (state === 'fulfilled') {
                    resolve(delay);
                } else {
                    reject(delay);
                }
            }, delay);
        });
    }
});