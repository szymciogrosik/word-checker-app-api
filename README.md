Uploading words to the database:
Open database:
sqlite3 words.db

Load file:
CREATE TABLE words(word TEXT PRIMARY KEY);
.mode line
.import words.txt words
CREATE INDEX idx_word ON words(word);
.quit

Check if all words added:
sqlite3 words.db "SELECT COUNT(*) FROM words;"

Uploading to the G-Cloud:

gcloud auth login

gcloud run deploy scrabble-search \
--source . \
--region europe-central2 \
--platform managed \
--allow-unauthenticated

https://APP.europe-central2.run.app/exact?q=test
https://APP.europe-central2.run.app/pattern?pattern=a??e

gcloud run services update scrabble-search \
--max-instances=1
