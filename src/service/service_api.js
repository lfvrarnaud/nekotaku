const KITSU_URL = `https://kitsu.io/api/edge`;

/**
 * Retourne la liste des mangas
 *
 * @param {Number} ITEMS_PER_PAGE Le nombre de manga par page. Défaut 10
 * @param {Number} pageOffset
 *
 * @returns {Array}
 */
async function fetchMangas(itemPerPage = 10, offset = 0, categories = null) {
  const response = await fetch(
    `${KITSU_URL}/manga?page[limit]=${itemPerPage}&page[offset]=${offset}${categories}`
  );

  const data = await response.json();

  return data.data;
}

/**
 * Retourne les recherche de la searchbar
 *
 * @param {value} search value de searchBar
 *
 * @returns {Array}
 */
async function fetchSearch(search) {
  const response = await fetch(`${KITSU_URL}/manga?filter[text]=${search}`);

  const data = await response.json();

  return data.data;
}
/**
 * Retourne les mangas de la liste par ID
 *
 * @param {value} idManga affiche l'id manga de l'url
 *
 * @returns {Array}
 */
async function fetchIdManga(idManga) {
  const response = await fetch(`${KITSU_URL}/manga/${idManga}`);

  const data = await response.json();

  return data.data;
}

/**
 * Retourne les chapitres de chaque manga
 *
 * @param {value} idManga affiche l'id manga de l'url
 * @param {Number} limit Le nombre de manga par page. Défaut 10
 * @param {Number} offset
 *
 * @returns {Array}
 */
async function fetchChapter(idManga, offset, limit) {
  const response = await fetch(
    `${KITSU_URL}/chapters?filter[manga_id]=${idManga}&sort=number&page[limit]=${limit}&page[offset]=${offset}`
  );

  const data = await response.json();

  return data.data;
}

/**
 * Retourne les personnages de chaque manga
 *
 * @param {value} idManga affiche l'id manga de l'url
 * @param {Number} limit Le nombre de manga par page. Défaut 10
 * @param {Number} offset
 *
 * @returns {Array}
 */
async function fetchCharacter(idManga, offset, limit) {
  const response = await fetch(
    `${KITSU_URL}/castings?filter[is_character]=true&filter[media_id]=${idManga}&filter[media_type]=Manga&include=character%2Cperson&page[limit]=${limit}&page[offset]=${offset}`
  );

  const data = await response.json();

  return data.included;
}

/**
 * Retourne les reviews sur chaque manga,faites par les utilisateurs de l'API
 *
 * @param {value} idManga affiche l'id manga de l'url
 * @param {Number} limit Le nombre de manga par page. Défaut 10
 * @param {Number} offset
 *
 * @returns {Array}
 */
async function fetchReaction(idManga, offset, limit) {
  const response = await fetch(
    `${KITSU_URL}/media-reactions?filter[mangaId]=${idManga}&include=user&page[limit]=${limit}&page[offset]=${offset}&sort=-upVotesCount`
  );

  const data = await response.json();

  return data;
}

/**
 * Retourne les dernières sorties mangas
 *
 * @param {value} idManga affiche l'id manga de l'url
 * @param {Number} limit Le nombre de manga par page. Défaut 10
 * @param {Number} offset
 *
 * @returns {Array}
 */
async function fetchLastUpdate(limit) {
  const response = await fetch(
    `${KITSU_URL}/manga?filter%5Bstatus%5D=upcoming&page%5Blimit%5D=${limit}`
  );

  const data = await response.json();

  return data.data;
}

/**
 * Retourne les recherche de la searchbar
 *
 * @param {value} idManga affiche l'id manga de l'url
 * @param {Number} limit Le nombre de manga par page. Défaut 10
 * @param {Number} offset
 *
 * @returns {Array}
 */
async function fetchBestRanking(limit) {
  const response = await fetch(
    `${KITSU_URL}/manga?page%5Blimit%5D=${limit}&sort=-average_rating`
  );

  const data = await response.json();

  return data.data;
}

/**
 * Retourne les recherche de la searchbar
 *
 * @param {value} idManga liste des id mangas du compte
 *
 * @returns {Array}
 */
async function fetchRead(idManga) {
  const response = await fetch(
    `${KITSU_URL}/manga?filter[id]=${idManga}&page[limit]=20`
  );

  const data = await response.json();

  return data.data;
}
export {
  fetchMangas,
  fetchSearch,
  fetchIdManga,
  fetchChapter,
  fetchCharacter,
  fetchReaction,
  fetchLastUpdate,
  fetchBestRanking,
  fetchRead,
};
