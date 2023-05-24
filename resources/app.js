/* Password Manager App version 3.0
 * created by David Sams
 * 
 * All methods and variables are contained in the "passwordApp" object.
 */

const passwordApp = (function() {
	
    let results = []; // global data array for active list of passwords to be displayed in results column
    let selected_tab = null; // global currently selected category variable
    let search_string = '';
    // ascii shrug emoji appears when there are no passwords to display
    const no_results = '<div class="no-results">¯\\_(ツ)_/¯</div>';

    // populates sidebar with default content on page load
    const engage = function() {
        $('.login-tabs button').each(function(){
            if ($(this).hasClass('active')) {
                populate_login_list($(this).data('tab'));
            }
        });
    };

    // displays results for currently selected category tab
    const populate_login_list = function(current_tab) {
        selected_tab = current_tab; // update global variable
        // sort by account
        if (selected_tab == 'work') {
            results = work;
        } else if (selected_tab == 'personal') {
            results = personal;
        } else { // sort by category
            results = [];
            personal.forEach(push_to_login_list);
            work.forEach(push_to_login_list);
        }
        let login_list_content = '';
        if (results.length < 1) {
            // no results found
            login_list_content += no_results;
        } else {
            results.sort(sort_alphabetically);
            // generate list html
            for (item in results) {
                login_list_content += '<div class="login-item">' + results[item].title + '</div>';
            }
        }
        $('.login-list').html(login_list_content);
        add_event_listeners_login_items();
    };

    // populate 'results' array based on selected category
    const push_to_login_list = function(item) {
        if (selected_tab == 'other' && !item.tab) {
            results.push(item);
        } else if (item.tab == selected_tab) {
            results.push(item);
        }
    };

    const sort_alphabetically = function(a, b) {
        return a.title.localeCompare(b.title);
    };

    // initialize on-click actions for buttons in results list
	const add_event_listeners_login_items = function() {
        if ($('.login-item').length) {
        	$('.login-item').each(function(i) {
                $(this).on('click', function() {
                    login_select(i);
                });
            });
        }
	};
	
    // initialize on-click actions for password card field buttons
    // -> each field in a password card copies its field contents to the clipboard when clicked
	const add_event_listeners_password_block = function() {
        $('.txt').each(function() {
            $(this).on('click', function() {
                copy_field($(this).data('content'));
            });
        });
	};
	
    // on-click action for results list button (opens corresponding password card)
	const login_select = function(item) {
        let password_data = '<div class="title" id="title-field">' + results[item].title + '</div>';
        for (let password_id in results[item]) {
            if (password_id == 'title' || password_id == 'tab') {
                continue; //ignore title and tab fields
            }
            if (results[item][password_id][1] == 'web') { // turn web addresses into links
                password_data += '<a href="' + results[item][password_id][0] + '" target="blank"';
            } else {
                password_data += '<div';
            }
            password_data += ' class="txt" data-content="' + results[item][password_id][0] + '">';
            password_data += password_id + ': <span';
            let password_data_value = results[item][password_id][0];
            if (results[item][password_id][1]) {
                if (results[item][password_id][1] == 'web') {
                    // clean up url before printing
                    password_data_value = password_data_value.replace(/https|http|:|\/|www./g, '');
                }
                password_data += ' class="' + results[item][password_id][1] + '"';
            }
            password_data += '>' + password_data_value + '</span>';
            if (results[item][password_id][1] == 'web') {
                password_data += '</a>';
            } else {
                password_data += '</div>';
            }
        }
		$('#showhidetoggle').html(password_data).show();
		add_event_listeners_password_block();
	};
	
    // copy to clipboard method
    // -> vanilla javascript here as jQuery incompatible with execCommand
	const copy_field = function(copythis) {
    	let copytxt = document.getElementById('hidden-field');
    	copytxt.value = copythis;
        copytxt.select();
        document.execCommand('copy');
	};

    // populates results list based on user-generated search query
    // -> this method is fired every time the search input field is updated;
    // -> typing a new character, space, or clearing the field all trigger this method
    const search = function(string) {
        search_string = string.toLowerCase(); // ignore case
        results = [];
        // compile results array
        personal.forEach(find_match);
        if (search_string.length) { // when search field cleared, default back to personal accounts list
            work.forEach(find_match);
        }
        let login_list_content = '';
        if (results.length < 1) {
            // no results found
            login_list_content += no_results;
        } else {
            results.sort(sort_alphabetically);
            // generate list html
            for (item in results) {
                login_list_content += '<div class="login-item">' + results[item].title + '</div>';
            }
        }
        $('.login-list').html(login_list_content);
        add_event_listeners_login_items();
        // deselect active category in sidebar
        $('.login-tabs .active').removeClass('active');
        // when search field cleared, default back to personal accounts list
        if (!search_string.length) {
            $('.login-tabs [data-tab="personal"]').addClass('active');
        }
    };

    // compile list of passwords whose title contains given search term
    const find_match = function(item) {
        if(item.title.toLowerCase().indexOf(search_string) >= 0) {
            results.push(item);
        }
    };

    // public methods
    return {
        engage: engage,
        populate_login_list: populate_login_list,
        search: search,
    };

})(); // this syntax lets the function call itself upon initialization

// once the page has finished loading...
$(function() {

    passwordApp.engage(); // display default content

    // on-click event handler for results list buttons
    $('.login-tabs button').on('click', function() {
        if (!$(this).hasClass('active')) { // ignore buttons that have already been selected
            $('.login-tabs button.active').removeClass('active');
            $(this).addClass('active');
            passwordApp.populate_login_list($(this).data('tab'));
        }
        // clear search field whenever a category tab is selected
        $('.searchbar').val('');
    });

    // pass search term to search() method to generate results every time the input is updated
    $('.searchbar').on('input', function(){
        passwordApp.search($(this).val());
    });

    // reveal passwords when the shift key is pressed
    $('body').keydown(function(e){
       if(e.keyCode == 16){
           $('.pw').addClass('show');
       }
    }).keyup(function(e){
       if(e.keyCode == 16){
           $('.pw').removeClass('show');
       }
    });

});

