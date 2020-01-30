import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Datasort from 'react-data-sort'

class ProductPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            shopItems: [],
            loading: null,
            sortBy: "name",
            direction: "asc",
            activePage: 0,
            searchQuery: ''
        }
    }

    async componentDidMount() {
        this.setState({ loading: true })
        const fetchText = url => fetch(url).then(r => r.json()); // 1
        const /*2*/[shop, resShopItems] = /*3*/ await Promise.all([
            fetchText(`${process.env.REACT_APP_API_BASE_URL}/shops/${this.props.match.params.shop_id}`),
            fetchText(`${process.env.REACT_APP_API_BASE_URL}/shop_items?shop=${this.props.match.params.shop_id}`)
        ]);
        this.setState({ loading: false, shop, shopItems: resShopItems["hydra:member"]});
        console.log(shop)
    }

    addCart(product) {
        this.props.dispatch({
            type: "ADD_PRODUCT",
            product: { ...product, quantity: 1 }
        })
    }

    setSortBy = sortBy => {
        this.setState({ sortBy });
    };

    toggleDirection = () => {
        this.setState({
            direction: this.state.direction === "asc" ? "desc" : "asc"
        });
    };

    goToPage = activePage => {
        this.setState({ activePage });
    };

    prevPage = () => {
        this.setState(({ activePage }) => ({
            activePage: activePage - 1
        }));
    };

    nextPage = () => {
        this.setState(({ activePage }) => ({
            activePage: activePage + 1
        }));
    };

    render() {
        const { sortBy, direction, activePage, searchQuery } = this.state;
        console.log(activePage)
        console.log(this.state.shopItems)
        if (this.state.loading === false) {
            if(this.state.shopItems.length >= 1) {
                return (
                    <Datasort
                        data={this.state.shopItems}
                        sortBy={sortBy}
                        direction={direction}
                        activePage={activePage}
                        searchQuery={searchQuery}
                        paginate
                        render={({ data, pages }) => {
                            return (
                                <div>
                                    <Links
                                        setSortBy={this.setSortBy}
                                        sortBy={sortBy}
                                        direction={direction}
                                        toggleDirection={this.toggleDirection}
                                    />
                                    <h2>
                                        {this.state.shop.name}
                                    </h2>
                                    <Content data={data} addCart={this.addCart.bind(this)} />
                                    <Flex style={{ justifyContent: "space-between" }}>
                                        <GoToPage goToPage={this.goToPage} pages={pages} />
                                        <PageIndicator pages={pages} activePage={activePage} />
                                        <Navigation
                                            activePage={activePage}
                                            goToPage={this.goToPage}
                                            nextPage={this.nextPage}
                                            prevPage={this.prevPage}
                                            pages={pages}
                                        />
                                    </Flex>
                                </div>
                            );
                        }}
                    />
                );   
            } else {
                return (
                    "Ce shop n'a pas de produit en vente actuellement"
                )
            }
        } else {
            return null
        }
    }
}

function Links({ setSortBy, sortBy, direction, toggleDirection }) {
    const columns = [
        { key: "id", title: "ID" },
        { key: "name", title: "Name" },
        { key: "description", title: "Description" },
        { key: "price", title: "Price" },

    ];
    const items = columns.map(({ key, title }) => {
        const active = key === sortBy;
        return (
            <ToggleLink
                key={key}
                active={active}
                onClick={() => {
                    if (active) {
                        toggleDirection();
                    }
                    setSortBy(key);
                }}
            >
                {title} {active ? direction === "asc" ? "▲" : "▼" : null}
            </ToggleLink>
        );
    });
    return (
        <div style={{display: "grid", gridGap: "5px", gridAutoflow: "column"}}>
            <div>Sort by</div>
             {items}
        </div>
    );
}

function ToggleLink({ children, active, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{ fontWeight: active ? "bold" : "normal", cursor: "pointer" }}
        >
            {children}
        </div>
    );
}

function Content({ data, addCart }) {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gridGap: "15px"
        }}>
            {data.map(({ product }) => (
                <div key={product.id}>
                    <div><Link to={`/product/${product.id}`}>{product.name}</Link></div>
                    <div>{product.description}</div>
                    <div>{product.price}</div>
                    <button onClick={() => {
                            addCart({ ...product, quantity: 1 })
                    }}>Add to cart</button>

                    {/* <div><button onClick={() => this.addCart(product)}>add</button></div> */}
                </div>
            ))}
        </div>
    );
}

function Flex({ children, style }) {
    return <div style={{ display: "flex", ...style }}>{children}</div>;
}

function GoToPage({ goToPage, pages }) {
    const options = [];
    for (let i = 0; i < pages; i++) {
        options.push(<option key={i} value={i}>{i + 1}</option>);
    }
    return (
        <div>
            Go to page{" "}
            <select onChange={e => goToPage(parseInt(e.target.value))}>
                {options}
            </select>
        </div>
    );
}

function Navigation({ activePage = 0, goToPage, nextPage, prevPage, pages }) {
    console.log(activePage)
    return (
        <Flex>
            <button disabled={activePage === 0} onClick={() => goToPage(0)}>
                {"<<"}
            </button>
            <button disabled={activePage === 0} onClick={prevPage}>
                {"<"}
            </button>

            <button disabled={activePage === pages - 1} onClick={nextPage}>
                {">"}
            </button>
            <button
                disabled={activePage === pages - 1}
                onClick={() => goToPage(pages - 1)}
            >
                {">>"}
            </button>
        </Flex>
    );
}

function PageIndicator({ pages, activePage = 0}) {
    return (
        <div>
            <b>{activePage + 1}</b> / {pages}
        </div>
    );
}

const App = () => (
    <ProductPage />
);





// render() {

//     return (
//         <>
//             <h2>PRODUCTS</h2>
//             <Datasort
//                 paginate
//                 render={({ data }) => (
//                     <table>
//                         <thead>
//                             <tr>
//                                 <div>Id</td>
//                                 <td>Name</td>
//                                 <td>Description</td>
//                                 <td>Price</td>
//                                 <td>Add</td>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {this.state.shopItems.map(shopItem => (
//                                 <tr key={shopItem.product.id}>
//                                     <td><h2><Link to={`/product/${shopItem.product.id}`}>{shopItem.product.name}</Link></h2></td>
//                                     <td><h4>{shopItem.product.description}</h4></td>
//                                     <td><h3>{shopItem.product.price}</h3></td>

//                                     <td><button onClick={() => this.addCart(shopItem.product)}>add</button></td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             />

//         </>
//     )
//         ;
// }


// FUNCTIONELLL

//     const shop_items = this.state.shopItems.map(shopItem => (

//         <div key={shopItem.product.id}>
//         <h2><Link to={`/product/${shopItem.product.id}`}>{shopItem.product.name}</Link></h2>
//         <h4>{shopItem.product.description}</h4>
//         <h3>{shopItem.product.price}</h3>

//         <button onClick={() => this.addCart(shopItem.product)}>add</button>
//         </div>
//     ))
//     return (
//         <>
//         <h2>PRODUCTS</h2>
//         {shop_items}
//         </>
//         )
//     ;
// }
// }

export default connect()(ProductPage);