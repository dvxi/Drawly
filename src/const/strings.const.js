const strings = {
    loginScreen: {
        subcontainer: {
            title: 'Gotowy?',
            text: 'Gdy wykonasz wszystkie powyższe instrukcje przycisk poniżej zmieni się na aktywny.',
        },
        button: {
            text: 'Przejdź do projektowania',
        }
    },
    drawingScreen: {
        greeting: [
            {
            title: 'Cześć, ',
            text: 'Poniżej znajduje się pole do projektowania wzoru ciastka oraz informacja o Twoim miejscu w kolejce. Miłej zabawy!'
            },
            {
            title: 'Brawo!',
            text: 'Teraz wystarczy poczekać, aż Twoje dzieło ujrzy światło dzienne. Obserwuj poziom postępu i przygotuj się na odbiór ciasteczka.'
            }
        ],
        drawingCanvas: {
            title: 'Projektowanie',
            printingTitle: 'Drukowanie'
        },
        undoButton: {
            text: 'Cofnij'
        },
        redoButton: {
            text: 'Powtórz'
        },
        confirmButton: {
            text: 'Zatwierdź i wyślij do wydruku'
        },
        status: {
            preparing: 'oczekiwanie',
            in_queue: 'w kolejce',
            in_progress: 'drukowanie',
            complete: 'gotowe do odbioru'
        }
    }
};

export default strings;