'use strict';

const development = true;

var App = (function App() {
	const chuckEndpoint = 'https://api.chucknorris.io/jokes/random';
	const quoteEndpoint = 'http://api.forismatic.com/api/1.0/';

	var self,
		$jokeContainer = $('#random-joke'),
		$jokeImg = $jokeContainer.find('img'),
		$jokeText = $jokeContainer.find('figcaption'),
		$quote = $('#quote'),
		$cite = $('cite');

	return {
		init: function init() {
			!!development && console.log('in init');
			self = this;
			window.App = !!development ? self: null;
			// do other initialization logic

			self.buttonClickHandler();
		},
		buttonClickHandler: function buttonClickHandler() {
			!!development && console.log('in buttonClickHandler');
			$('button').off('click').on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var $me = $(e.target),
					subject = $me.data('namespace'),
					predicate = $me.data('method'),
					ahbject = $me.data('param');

				if (ahbject) {
					self[subject][predicate](ahbject);
				} else {
					self[subject][predicate]();
				}
			});
		},
		Ajax: {
			post: function ajaxPost(where, what) {
				if (!where) {
					return Promise.reject('didn\'t send the endpoint');
				}
				if (!what) {
					return Promise.reject(`i don\'t know what to send to ${where}`);
				}

				!!development && console.log(`Ajax.post'ing ${what} to ${where}`);
				return $.post(where, what).done(function ajaxPostSuccess(json) {
					!!development && console.log(`post response object: ${json}`);
					return json;
				}).fail(function ajaxPostFail(error) {
					!!development && console.error(`ajaxPostFail error: ${error}`);
					return error;
				});
			},
			getJson: function ajaxGetJSON(where) {
				if (!where) {
					return Promise.reject('didn\'t  send the endpoint');
				}
				!!development && console.log(`in Ajax.getJson with this endpoint: ${where}`);

				return $.getJSON(where).done(function getJsonDone(json, textStatus, jqXHR) {
					if (jqXHR.statusText === "OK" && textStatus === "success") {
						!!development && console.group('getJson call is done');
						!!development &&console.log('status: ', jqXHR.status);
						!development && console.log('statusText: ', jqXHR.statusText);
						!!development && console.log('textStatus: ', textStatus);
						!!development && console.log('data: ', json);
						!!development && console.groupEnd();
						return json;
					} else {
						!!development && console.group('getJson warning info');
						!!development && console.warn('jqXHR.status: ', jqXHR.status);
						!!development && console.warn('jqXHR.statusText: ', jqXHR.statusText);
						!!development && console.warn('textStatus: ', textStatus);
						!!development && console.groupEnd();
						return textStatus;
					}
				}).fail(function getJsonFail(jqxhr, textStatus, error) {
					var err = textStatus + ", " + error;
					!!development && console.error('in getJson fail with err: ', err);
					return err;
				});
			}
		},
		View: {
			show: function show(what) {
				!!development && console.log(`in show with ${what}`);
				var $toShow = $('#' + what),
					$toHide = $toShow.siblings();


				$toHide.addClass('hidden');
				$toShow.removeClass('hidden');
			},
			hide: function hide(what) {
				// you can also hide things or do whatever else you want.
				!!development && console.log(`in hide with: ${what}`);
				$('#' + what).addClass('hidden');
			}
		},
		Chuck: {
			getRandomJoke: function getRandomJoke() {
				!!development && console.log('in getRandomJoke');
				self.Ajax.getJson(chuckEndpoint).then(jokeObject => {
					$jokeImg.attr('src', jokeObject.icon_url);
					$jokeText.empty().text(jokeObject.value);
				}, err => {
					throw new Error('something went terribly wrong: ', err);
				});
			}
		},
		Quote: {
			getRandomQuote: function getRandomQuote() {
				!!development && console.log('in getRandomQuote');
				$.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(res) {
					var quoteObject = res[0],
						quoteOG = quoteObject.content,
						quote = quoteOG.substring(3, quoteOG.length - 5),
						by = quoteObject.title;

					$quote.empty().html(`"${quote}"`);
					$cite.empty().html(`– ${by}`);
				});
			}
		}
	};
}());

$(function() {
	App.init();
});