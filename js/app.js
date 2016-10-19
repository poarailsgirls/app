var hashtag = 'railsgirlspoa';
var instagramPagination;
var agenda = [
    {
        data: 'Dia 21/10 - Sexta-feira',
        slots: [
            { hora: '18h30', nome: 'Lanche', local: 'Global' },
            { hora: '19h30', nome: 'Abertura: Mas o que é Rails Girls? O que vamos fazer aqui?', local: 'Global' },
            { hora: '20h00', nome: 'Roles de TI (BA, QA, EXU, PM e DEV)', local: 'Global' },
            { hora: '21h00', nome: 'Ice Breaker - Grupos de Interesse', local: 'Global' },
            { hora: '21h20', nome: 'Instalação do Ambiente', local: 'Global' },
            { hora: '22h30', nome: 'Beijo, abraço e te vejo amanhã!', local: 'Global' }
        ]
    },
    {
        data: 'Dia 22/10 - Sábado',
        slots: [
            { hora: '08h30', nome: 'Café da Manhã', local: 'Global' },
            { hora: '09h30', nome: 'Separação dos times', local: 'Global' },
            { hora: '10h00', nome: 'Workshop de HTML e CSS', local: 'ThoughtWorks/Globo' },
            { hora: '11h30', nome: 'Workshop de Rails', local: 'ThuoughtWorks/Globo' },
            { hora: '12h30', nome: 'Almoço', local: 'ThoughtWorks' },
            { hora: '14h00', nome: 'Mão na massa!', local: 'ThoughtWorks/Globo' },
            { hora: '16h30', nome: 'Café da tarde', local: 'ThoughtWorks' },
            { hora: '17h00', nome: 'Mão na massa de novo!', local: 'ThoughtWorks/Globo' },
            { hora: '18h30', nome: 'Retrospectiva', local: 'ThoughtWorks/Globo' },
            { hora: '19h00', nome: 'Palestra HP', local: 'Global' },
            { hora: '19h30', nome: 'Fishbowl: Mulheres na TI', local: 'Global' },
            { hora: '20h30', nome: 'Fechamento', local: 'Global' }
        ]
    }
];

var links = [
    { nome: 'Código de conduta', icone: 'fa fa-file-text', link: 'http://railsgirls.com/files/porto-alegre/codigo_conduta_2015.pdf' },
    { nome: 'Facebook', icone: 'fa fa-facebook', link: 'https://www.facebook.com/railsgirls' },
    { nome: 'Twitter', icone: 'fa fa-twitter', link: 'https://twitter.com/railsgirls' },
];

$(function () {
    loadTimeline(agenda, '#tabAgenda');
    loadFotosInstagram();
    loadLinks();
});

var loadTimeline = function (list, div) {
    $(list).each(function (i, e) {
        var horario = (e.horario) ? '<h2 class="tabTitle">' + e.horario + '</h2>' : '';
        var html = '<h1 class="tabTitle">' + e.data + horario + '</h1><ul class="timeline">';
        $(e.slots).each(function (i, s) {
            var descricao = (s.descricao) ? '<div class="timeline-body"><p>' + s.descricao + '</p></div>' : '';
            var style = (i % 2 == 0) ? '' : 'timeline-inverted';
            html += '<li class="' + style + '"><div class="timeline-badge">' + s.hora + '</div><div class="timeline-panel"><div class="timeline-heading"><h4 class="timeline-title">' + s.nome + '</h4><p class="text-muted"><i class="glyphicon glyphicon-map-marker"></i> ' + s.local + '</p></div>' + descricao + '</div></li>';
        })
        html += '</ul>';

        $(div).append(html);
    });
}

var loadInstagramHashtags = function() {
    var hashtagUrl = 'https://instagram-buddy-api.herokuapp.com/' + hashtag;
    if(instagramPagination && instagramPagination.next_max_tag_id) {
      hashtagUrl = hashtagUrl.concat('?next_max_tag_id=' + instagramPagination.next_max_tag_id)
    }
	
    $.ajax({
        url: hashtagUrl,
        dataType: 'json',
        type: 'GET',
        success: function (response) {
            instagramPagination = response.pagination;
            $(response.data).each(function (i, e) {
                $('#tabFotos .gallery').append('<div class="gallery-foto col-xs-6 col-sm-3 col-md-2 col-lg-1"> <a class="" href="javascript:showModal(\'' + e.images.standard_resolution.url + '\', \'' + e.user.username + '\', \'' + ((e.caption == null) ? '' : e.caption.text) + '\')"><img src="' + e.images.thumbnail.url + '" class="img-rounded img-responsive"></a> </div>')
            });
            console.log(response);
            if(!instagramPagination.next_max_id)
                $('.carregar-mais').hide();
        },
        error: function (data) {
            console.log(data);
        }
    });
}
var loadFotosInstagram = function () {
    $('#tabFotos').append('<div class="bs-callout text-left"><h4>#' + hashtag + '</h4><p>Use a tag #' + hashtag + ' no Instagram para que sua foto apareça aqui</p></div>');
    $('#tabFotos').append('<div class="gallery"></div>');
    $('#tabFotos').append('<div class="row"><div class="col-xs-12"><button class="carregar-mais"> Carregar mais </button></div></div>');
	$('#tabFotos .carregar-mais').on('click', loadInstagramHashtags);
	loadInstagramHashtags();
}

var loadMoreInstagram = function() {
    $.ajax({
        url: 'https://instagram-buddy-api.herokuapp.com/'+ hashtag +'?next_max_tag_id=' + instagramPagination.next_max_tag_id,
        dataType: 'json',
        type: 'GET',
        success: function (response) {
            console.log(response);
            instagramPagination = response.pagination;
            $(response.data).each(function (i, e) {
                $('#tabFotos .gallery').append('<div class="gallery-foto"> <a class="col-xs-6 col-sm-3 col-md-2 col-lg-1" href="javascript:showModal(\'' + e.images.standard_resolution.url + '\', \'' + e.user.username + '\', \'' + ((e.caption == null) ? '' : e.caption.text) + '\')"><img src="' + e.images.thumbnail.url + '" class="img-rounded img-responsive"></a> </div>')
            });
        },
        error: function (data) {
            console.log(data);
        }
    });
};

var loadFotosTwitter = function() {
    $.ajax({
        url: '',
        dataType: 'json',
        type: 'GET',
        success: function (response) {
            console.log(response);
            $(response.tweets).each(function (i, e) {
                $('#tabFotos .gallery').append('<div class="gallery-foto"> <a class="col-xs-6 col-sm-3 col-md-2 col-lg-1" href="javascript:showModal(\'' + e.image + '\', \'' + e.screen_name+ '\', \'' + ((e.text == null) ? '' : e.text) + '\')"><img src="' + e.image + '" class="img-rounded img-responsive"></a></div>')
            });
        },
        error: function (data) {
            console.log(data);
        }
    });

}

var loadLinks = function(){
    var html = '';
    $(links).each(function (i, e) {
        html += '<div class="col-xs-12 col-sm-6"><a class="box" href="' + e.link + '" target="_blank"><i class="' + e.icone + '" aria-hidden="true"></i> ' + e.nome + '</a></div>';
    });
    $('#tabInformacoesLinks').append(html);
}


var showModal = function (url, user, text) {
    $('#modal img').attr('src', url);
    $('#modal a').text('@' + user);
    $('#modal a').attr('href', 'https://www.instagram.com/' + user);
    $('#modal span').text(text);
    $('#modal').modal().show();
}

var gotoMapa = function (x, y) {
    $('html, body').animate({ scrollTop: x + 'px' }, 800);
    $('#mapa').animate({ scrollLeft: y + 'px' }, 800);
}
