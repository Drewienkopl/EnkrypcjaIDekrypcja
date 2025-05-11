# EnkrypcjaIDekrypcja
Strona z rejestracją i logowaniem, zapisem danych do bazy PostgreSQL. Po zalogowaniu można zakodować i odkodować wiadomości, zakodowane wiadomości są zapisywane w bazie i tylko ten użytkownik, który te wiadomości zapisał będzie mógł je odczytać w history. Sesja po stronie serwera, bez JSONWebToken. Wszystkie zapise dane w bazie kasują się po wyłączeniu(ddl-auto: create-drop)

Front-end - JavaScript w React

✅Wprowadzenie wiadomości do zaszyfrowania lub odszyfrowania

✅Formularz logowania z walidacją poprawności danych.

Back-end Java w Spring 

✅Operacje szyfrowania i deszyfrowania wiadomości

✅Zapisanie zaszyfrowanych wiadomości w bazie danych i odczytanie ich z bazy.

Wymagania bezpieczeństwa: 

✅Walidacja danych wejściowych, 

✅Obsługa błędów, 

✅Zabezpieczenie przed atakami typu SQL injection i XSS

✅Kontrola dostępu do zaszyfrowanych wiadomości tylko dla uprawnionych użytkowników.

Dodatkowo:

🟡Dobrze wyglądać na różnych urządzeniach (komputer, tablet, telefon).

🟡Dostępna dla osób korzystających z czytników ekranowych oraz mieć przejrzysty i zrozumiały układ interfejsu użytkownika.

✅Wydajność - aplikacja powinna działać szybko i płynnie.


//

//

//

npm run dev     (Do odpalenia Frontend)

Należy najpierw stworzyć baze signup(lub inną nazwe, ale trzeba by wtedy zmienić:jdbc:postgresql://localhost:5432/signup) 

Pomocne komendy do PostgreSQL:

CREATE DATABASE signup;   

\l   (wyświetla bazy)

\c signup   (przechodzi do signup)

\d app_user   

SELECT * FROM app_user;   

\x   (zmienia na wierszowe)




Jak Znajde czas to do zrobienia poprawa błędów:

1. Ograniczenia algorytmu Bcrypt powodują, że w przypadku haseł powyżej 64 znaków może się zdarzyć sytuacja, w której algorytm przyjmie więcej niż jedno hasło jako poprawne. Warto byłoby skorzystać w tym przypadku z Argon2

2. Walidacja danych powinna być realizowana przy użyciu mechanizmów oferowanych przez Spring, takich jak adnotacja @Valid, zamiast implementować ją ręcznie.

3. CRITICAL - Te nagłówki powinny być po stronie frontu, ew. na reverse proxy kierującym na front:

        httpServletResponse.setHeader("X-Content-Type-Options", "nosniff");

        httpServletResponse.setHeader("X-Frame-Options", "DENY");

        httpServletResponse.setHeader("X-XSS-Protection", "1; mode=block"); // nadal wspierane w niektórych przeglądarkach

        httpServletResponse.setHeader("Referrer-Policy", "no-referrer");

        httpServletResponse.setHeader("Permissions-Policy", "geolocation=(), microphone=()");

        httpServletResponse.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; object-src 'none';");


4. Ta walidacja musi odbywać się z wykorzystaniem Spring Security, zamiast umieszczać w każdym z endpointów:

if(user == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
}
