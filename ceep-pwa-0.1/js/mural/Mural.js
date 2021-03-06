const Mural = (function(_render, Filtro) {
    "use strict"

    let cartoes = pegaCartoesDoUsuario()

    function pegaCartoesDoUsuario() {
        let cartoesLocal = JSON.parse(localStorage.getItem(usuario))
        if (cartoesLocal) return cartoesLocal.map(cartao => new Cartao(cartao.conteudo, cartao.tipo))

        return []
    }

    cartoes.forEach(cartao => prepararCartao(cartao))
    const render = () => _render({ cartoes: cartoes, filtro: Filtro.tagsETexto });
    render()

    Filtro.on("filtrado", render)

    function prepararCartao(cartao) {
        cartao.on("mudanca.**", salvaCartoes)
        cartao.on("remocao", () => {
            cartoes = cartoes.slice(0)
            cartoes.splice(cartoes.indexOf(cartao), 1)
            salvaCartoes()
            render()
        })
    }

    function salvaCartoes() {
        localStorage.setItem(usuario, JSON.stringify(
            cartoes.map(cartao => ({ conteudo: cartao.conteudo, tipo: cartao.tipo }))
        ))
    }

    login.on("login", () => {
        cartoes = pegaCartoesDoUsuario()
        render()
    })

    login.on("logout", () => {
        cartoes = []
        render()
    })

    function adiciona(cartao) {
        if (logado) {
            cartoes.push(cartao)
            salvaCartoes()
            prepararCartao(cartao)
            render()
            return true
        } else {
            alert("Você não está logado");
        }
    }

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro)
