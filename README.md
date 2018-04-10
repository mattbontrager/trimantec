[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

# Trimantec
Triple + Semantic = Trimantec™

## WIP
:construction:

This is still a work in progress. I'm making it public for those who can benefit from it now. This also gives me a place to grow it as I have time. Consequently, I'm not accepting contributions at the moment.

## Communication-Driven Design
Using an app is like having a conversation with someone. Are their responses appropriate to the context of your conversation? Do they hear you? How can you tell?

To improve a user's experience with an app, I encourage developers to approach the design process as if they are building a representation of themselves with whom their users will have a conversation.

<pre>
Communication driven design
  —> actively listens for user initiated events
    —> responds appropriately in a timely manner
  —> is made up of application behaviors that are
    -> consistent
    -> predictable
</pre>

To improve the developer's experience coding the app, I encourage them to use this design pattern for reasons that follow. But first, some definitions.

## Terms

<dl id="terms">
    <dt>Subject</dt>
    <dd>A <dfn id="definition-subject">Subject</dfn> of a sentence is the person, place, thing, or idea that is doing or being something.</dd>
    <dt>Predicate</dt>
    <dd>A <dfn id="definition-predicate">Predicate</dfn> is the part of a sentence containing a verb and states something about the <code>subject</code> <small>(e.g., <em>went home</em> in John went home)</small>.</dd>
    <dt>Object</dt>
    <dd>An <dfn id="definition-object">Object</dfn> is the entity that is acted upon by the <code>subject</code>.</dd>
    <dt>Namespace</dt>
    <dd>A <dfn id="definition-namespace">Namespace</dfn> is a collection of behaviors, usually represented as an object literal, module, or namespace. This is the term we use in the html <code>data-attribute</code> to denote the <code>subject</code> of the triple.</dd>
    <dd>e.g., <code><b>View</b> = {}</code></dd>
    <dt>Method</dt>
    <dd>A <dfn id="definition-method">Method</dfn> is a specific action to be taken on the object/element passed to it.</dd>
    <dd>The commonly accepted meaning of Class methods.</dd>
    <dd>e.g., <code>View.<b>show</b>(elem)</code></dd>
    <dt>Param(s)</dt>
    <dd>For the purposes of this conversation, a <dfn id="definition-param">Param</dfn> contains the information that provides context or additional data required in the <code>method</code>.</dd>
    <dd>e.g., <code>View.show(<b>elem</b>)</code></dd>
</dl>

## Benefit
### It Writes Itself (well... sort of)
For the developer, there are several benefits of using this design pattern. The application behavior is tightly coupled with the semantics of the HTML while maintaining a separation of concerns. So, as the developer is writing the semantic markup of the application, (s)he already has a very good idea how the application script needs to be structured as well as what needs to be included.

Conversely, this design pattern works equally well if you're the type of developer that prefers to start with coding the application's behavior. By the time you're done, it becomes obvious what data-attributes need to be included with each interaction element in the HTML.

### Productivity, Maintainability, and Readability
**Or, click handler vs. click handlersssssssssssss**

This design pattern turns this:

```javascript
var $nav = $('nav'),
    $firstButton = $nav.find('button:first'),
    $secondButton = $nav.find('button:nth-child(2)'),
    $thirdButton = $nav.find('button:last');

$firstButton.off('click').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    $('#section-1').siblings().addClass('hidden').end().removeClass('hidden');
});

$secondButton.off('click').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    $('#section-2').siblings().addClass('hidden').end().removeClass('hidden');
});

$thirdButton.off('click').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    $('#final-custom-search-form').siblings().addClass('hidden').end().removeClass('hidden');
});

$('#button-a').off('click').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var $clicked = $(e.target),
        $form = $clicked.parentsUntil('form'),
        $input = $form.find('input');

    $input.val('').focus();
});

$('#button-b').off('click').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var $form = $(e.target).parentsUntil('form');

    $.post(apiURL, $form.serialize(), function(data, response, jqXHR) {
        if (response.statusText !== "OK") {
            // handle error
            return;
        }
        if (!data || !data.length) {
            // do stuff with empty response object
            return;
        }
        // do stuff with data
    });
});
```

into this:

```javascript
$('button').off('click').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var $me = $(e.target),
        subject = $me.data('namespace'),
        predicate = $me.data('method'),
        ahbject = $me.data('param');
        
    [subject][predicate](ahbject);
    // If #button-a is clicked this becomes Phorm.clearInputText('custom-search-location-input');
    // If #button-b is clicked, this becomes Phorm.customSubmit('final-custom-search-form');
    // If the first button in the nav is clicked, this becomes View.show('section-1');
});
```

Writing fewer lines of code makes you more productive.

This also abstracts away the interaction to a logical module dedicated to that one behavior. This type of abstraction accomplishes a few things: 

1. Far easer to maintain: If you have more than one interaction point related to that behavior, you don't have to change that logic bound to each and every click event; simply change the behavior in that one place.
2. Far easier to read: You won't have to hunt through dozens of click handlers to find the one piece of code you're looking for. Simply read the data-attributes of the interaction point in the HTML and navigate to that Namespace.method.


## Example
The following is a brief example to highlight, in a practical way, some of the benefits offered by this design pattern. For a deeper dive, fork/clone this repo. 

`form.html`
```html
<doctype html>
<html>
    <head>
        <meta name="charset" content="utf-8">
    </head>
    <body>
        <nav class="search-results-nav page-nav">
            <button
                data-namespace="View"
                data-method="show"
                data-param="section-1">
                Show 1
            </button>
            <button
                data-namespace="View"
                data-method="show"
                data-param="section-2">
                Show 2
            </button>
            <button
                data-namespace="View"
                data-method="show"
                data-param="final-custom-search-form">
                Show Form
            </button>
        </nav>
        <section id="section-1">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A officiis laudantium nesciunt quam, quidem voluptatem.</p>
        </section>
        <section id="section-2">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint illum labore perspiciatis iure repudiandae reprehenderit animi recusandae nulla in placeat adipisci dicta distinctio accusantium consequuntur exercitationem nostrum, velit, temporibus, quidem?</p>
        </section>
        <form id="final-custom-search-form">
            <input
                id="custom-search-location-input"
                type="text"
                placeholder="Where are you going?"
                form="final-custom-search-form"
                maxlength="50"
                autocorrect="on"
                autocapitalize="words" />
            <button id="button-a"
                data-namespace="Phorm"
                data-method="clearInputText"
                data-param="custom-search-location-input">
                X
            </button>
            <button id="button-b"
                data-namespace="Phorm"
                data-method="customSubmit"
                data-param="final-custom-search-form">
                Submit
            </button>
        </form>
        <script src="js/jquery.min.js"></script>
        <script src="js/main.js"></script>
    </body>
</html>
```

`main.js`
```javascript

// IIFE (immediately invoked function expression). For the most authoritative definition of an IIFE, see:
// http://benalman.com/news/2010/11/immediately-invoked-function-expression/
var App = (function() {
    const apiURL = 'https://whatever.com/api/v1/';
    const Phorm = {
        customSubmit: (formId) => { // returns a Promise
            return $.post(apiURL, $('#' + formId).serialize(), function(response) {
                return (response.statusText === "OK") ? true: false;
            });
        },
        clearInputText: (inputId) => {
            $('#' + inputId).val('').focus();
        }
    };
    const View = {
        init: () => {
            // some initialization
            return new Promise(resolve => {
                // do things and stuff
                resolve();
            });
        },
        show: (thing) => {
            const $thing = $(thing);
            const $siblings = $thing.siblings();
            
            $siblings.hide();
            $thing.show();
        }
    };

    var self;

    return {
        init: function init() {
            self = this;

            // initialize the View
            View.init().then(() => {
                // bind click handlers
                self.buttonClickHandler();
            });
        },
        buttonClickHandler: function buttonClickHandler() {
            $('button').off('click').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                var $me = $(e.target),
                    subject = $me.data('namespace'),
                    predicate = $me.data('method'),
                    ahbject = $me.data('param');
                    
                [subject][predicate](ahbject);
                // If #button-a is clicked this becomes Phorm.clearInputText('custom-search-location-input');
                // If #button-b is clicked, this becomes Phorm.customSubmit('final-custom-search-form');
                // If the first button in the nav is clicked, this becomes View.show('section-1');
            });
        }
    };
}());


$(function() {
    // initialize the app
    App.init();
});
```

